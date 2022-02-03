import Title from './Title';
import Menu from './Menu';
import GameView from './GameView';
import React from 'react';

class App extends React.Component {
  constructor() {
    super()
    this.joinGame = this.joinGame.bind(this);
    this.getGameState = this.getGameState.bind(this);
    this.state = {
      game_id: null,
      game_name: "none",
      game_state: {board:[], players:[]},
    }
  }

  joinGame(game_id) {
    this.setState({game_id: game_id});
  }

  getGameState() {
    if (this.props.game_id == null) {
      console.log("No game id");
      //return;
    }
    //const data = httpRequest(`/api/${this.props.game_id}/get-state`, "GET", none);
    var data = {payload: [["a", "b"], [], ["b", "b", "b", "a"], ["a", "a", "b"], ["a", "b", "b", "a"], ["a", "a", "b", "a"], ["b", "a", "b", "b", "a"]], players: ["a", "b"], game_name: "connect_4"}
    var board = [[], [], [], [], [], []];
    const col_height = 6;

    data.payload.forEach((col) => {
      for (var y = 0; y < col_height; y++) {
        if (y < col.length) {
          if (col[y] === data.players[0]) {
            board[(col_height - 1) - y].push(1);
          }
          else if (col[y] === data.players[1]) {
            board[(col_height - 1) - y].push(2);
          }
        }
        else {
          board[(col_height - 1) - y].push(0);
        }
      }
    });
    this.setState({
      game_state: {board: board, players: data.players},
      game_name: data.game_name
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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
