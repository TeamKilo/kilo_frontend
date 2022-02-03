import JoinGame from "./JoinGame";
import httpRequest from "../httpRequest";
import React from 'react';
import CreateGame from "./CreateGame";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {createdID: null}

    this.createGame = this.createGame.bind(this);
  }

  createGame() {
    const data = httpRequest("https://team-kilo-server.herokuapp.com/api/create-game", "POST", { name: "connect_4" });
    const game_id = data.game_id;
    this.setState({createdID: game_id.toString()});
    this.props.joinGame(game_id);
  }

  render() {
    return (
      <div className="d-grid gap-2">
        <JoinGame joinGame={this.props.joinGame} />
        <CreateGame createdID={this.state.createdID} createGame={this.createGame} />
        <button type="button" className="btn btn-secondary" onClick={this.props.getGameState}>Get State</button>
      </div>
    );
  }
}

export default Menu;
