import JoinGame from "./JoinGame";
import React from 'react';
import CreateGame from "./CreateGame";
import axios from "axios";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {createdID: null}

    this.createGame = this.createGame.bind(this);
  }

  createGame() {
    axios.post("https://team-kilo-server.herokuapp.com/api/create-game", { name: "connect_4" })
    .then(res =>
    {
      const game_id = res.data.game_id;
      this.setState({ createdID: game_id.toString() });
      this.props.joinGame(game_id);
    });
  }

  render() {
    return (
      <div className="d-grid gap-2">
        <JoinGame joinGame={this.props.joinGame} />
        <CreateGame createdID={this.state.createdID} createGame={this.createGame} />
      </div>
    );
  }
}

export default Menu;
