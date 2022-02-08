import Title from './Title';
import Menu from './menu/Menu';
import GameView from './GameView';
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
    }
  }

  joinGame(game_id) {
    this.setState({game_id: game_id});
    this.getGameState()
  }

  getGameState() {
    if (this.props.game_id == null) {
      console.log("No game id");
      //return;
    }
    /*
    httpRequest(`/api/${this.props.game_id}/get-state`, "GET", none)
    .then(data => {
      var data = data;
    }); */
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

  waitForMove() {

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
              {/*<GameView
                gameName={this.state.game_name}
                gameState={this.state.game_state}
              />*/}
              <ListGames />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
