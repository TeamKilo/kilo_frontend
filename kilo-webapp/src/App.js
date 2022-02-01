import Title from './Title';
import Menu from './Menu';
import GameView from './GameView';
import React from 'react';

class App extends React.Component {
  constructor() {
    super()
  }

  joinGame(game_id) {
    console.log(game_id)
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
              />
            </div>
            <div className="col-8 text-center">
              <GameView
                state={this.state}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
