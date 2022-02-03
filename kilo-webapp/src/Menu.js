import JoinGame from "./JoinGame";
import httpRequest from './httpRequest';
import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  createGame() {
    //const data = httpRequest("/api/create-game", "POST", JSON.stringify({name: "connect_4"}));
    //const game_id = data.game_id;
    const game_id = 1234
    const game_id_element = document.getElementById("game-id-display")
    game_id_element.innerHTML = `Game ID: ${game_id}`;
    game_id_element.style.visibility = "visible";
    this.props.joinGame(game_id);
  }

  render() {
    return (
      <div className="d-grid gap-2">
        <JoinGame
          joinGame = {this.props.joinGame}
        />
        <button type="button" className="btn btn-primary" onClick={() => this.createGame()}>Create Game</button>
        <h2 id="game-id-display" style={{visibility: "hidden"}}>Game ID:</h2>
        <button type=" button" className="btn btn-secondary" onClick={() => this.props.getGameState()}>Get State</button>
      </div>
    );
  }
}

export default Menu;