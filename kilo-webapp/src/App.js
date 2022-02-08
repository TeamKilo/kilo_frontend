import Title from './Title';
import Menu from './menu/Menu';
import GameView from './GameView';
import axios from "axios";
import React from 'react';
import ListGames from './menu/ListGames';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.joinGame = this.joinGame.bind(this);
    this.getGameState = this.getGameState.bind(this);
    this.state = {
      game_id: null,
      game_name: "none",
      game_state: {board:[], players:[]},
      bad_id: false,
    }
    
    this.cancelTokenSource = axios.CancelToken.source();
  }

  joinGame(game_id) {
    this.setState({ game_id: game_id }, () => {
      this.getGameState();
      this.cancelTokenSource.cancel();
      this.cancelTokenSource = axios.CancelToken.source();
      this.waitForMove();
    });
  }

  getGameState() {
    this.setState({bad_id: false}, () => {
      axios.get(`https://team-kilo-server.herokuapp.com/api/${this.state.game_id}/get-state`).then(res => {
        //var data = {payload: [["a", "b"], [], ["b", "b", "b", "a"], ["a", "a", "b"], ["a", "b", "b", "a"], ["a", "a", "b", "a"], ["b", "a", "b", "b", "a"]], players: ["a", "b"], game_name: "connect_4"}
        let board = [[], [], [], [], [], []];
        const col_height = 6;
        if (res.data.payload.length === 0) {
          board = board.map(l => [0, 0, 0, 0, 0, 0, 0]);
        } else {
          res.data.payload.forEach((col) => {
            for (var y = 0; y < col_height; y++) {
              if (y < col.length) {
                if (col[y] === res.data.players[0]) {
                  board[(col_height - 1) - y].push(1);
                }
                else if (col[y] === res.data.players[1]) {
                  board[(col_height - 1) - y].push(2);
                }
              }
              else {
                board[(col_height - 1) - y].push(0);
              }
            }
          });
        }
        this.setState({
          game_state: { board: board, players: res.data.players},
          game_name: res.data.game
        });
      }).catch(error => {
        if (error.response.status === 400) {
          this.setState({
            game_id: null,
            game_name: "none",
            game_state: { board: [], players: [] },
            bad_id: true
          })
        }
      });
    });
  }

  waitForMove() {
    console.log("waiting...");
    axios.get(
      `https://team-kilo-server.herokuapp.com/api/${this.state.game_id}/wait-for-update`,
      {cancelToken: this.cancelTokenSource.token}
    ).then(res => {
      setTimeout(() =>
      {
        if (res.data.updated) {
          this.getGameState();
          this.waitForMove();
        }
        else {
          this.waitForMove();
        }
      }, 100);
    }).catch(e => {
      if (e.constructor.name !== "Cancel") {
        if (e.response !== undefined) {
          if (e.response.status === 400) {
            this.setState({
              game_id: null,
              game_name: "none",
              game_state: { board: [], players: [] },
              bad_id: true
            })
          }
        } else {  // Need to distinguish between timeout and other network errors
            this.waitForMove();  // Timeout
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div><Title /></div>
        <div className="d-grid container">
          <div className="row align-items-center" style={{ height: "90vh" }}>
            <div className="col-4">
              <Menu
                joinGame={this.joinGame}
                getGameState={this.getGameState}
              />
            </div>
            <div className="col-8 text-center">
              <GameView
                gameName={this.state.game_name}
                gameState={this.state.game_state}
                badID={this.state.bad_id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
