import Title from './Title';
import Menu from './Menu';
import GameView from './GameView';
import React from 'react';

class App extends React.Component {
  constructor() {
    super()
    this.state = 0;
  }

  joinGame(i) {
    console.log(i)
  }

  render() {
    return (
      <div>
        <div><Title /></div>
        <div style={{ height: "90vh" }} class="d-grid align-items-center container">
          <div class="row">
            <div class="col-4 text-center">
              <Menu
                joinGame={this.joinGame}
              />
            </div>
            <div class="col-8 text-center">
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
