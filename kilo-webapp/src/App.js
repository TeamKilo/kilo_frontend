import Title from './Title';
import Menu from './Menu';
import GameView from './GameView';
import React from 'react';

class App extends React.Component {
  constructor() {
    super()
    this.game_id = null;
    this.joinGame = this.joinGame.bind(this);
    this.getGameState = this.getGameState.bind(this);
    this.board = [];
    this.players = [];
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
    var data = {payload: [["a", "b"], [], ["b", "b", "b", "a"], ["a", "a", "b"], ["a", "b", "b", "a"], ["a", "a", "b", "a"], ["b", "a", "b", "b", "a"]], players: ["a", "b"]}
    var board = [[], [], [], [], [], []];
    const col_height = 6;

    data.payload.forEach((col) => {
      for (var y = 0; y < col_height; y++) {
        if (y < col.length) {
          if (col[y] == data.players[0]) {
            board[(col_height - 1) - y].push(1);
          }
          else if (col[y] == data.players[1]) {
            board[(col_height - 1) - y].push(2);
          }
        }
        else {
          board[(col_height - 1) - y].push(0);
        }
      }
    });
    console.log(board);
    this.setState({board: board});
  }

  render() {
    return (
      <div>
        <div><Title /></div>
        <div style={{ height: "90vh" }} className="d-grid align-items-center container">
          <div className="row">
            <div className="col-4 text-center">
              <Menu
                joinGame={this.joinGame}
                getGameState={this.getGameState}
              />
            </div>
            <div className="col-8 text-center">
              <GameView
                gameName={"connect_4"}
                gameState={{board: this.board, players: this.players}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
