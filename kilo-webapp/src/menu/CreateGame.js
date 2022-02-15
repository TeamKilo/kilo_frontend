import React from "react";
import axios from "axios";

function createGame(onGameCreated) {
    axios.post("https://team-kilo-server.herokuapp.com/api/create-game", { name: "connect_4" })
    .then((res) => {
        const game_id = res.data.game_id;
        onGameCreated(game_id);
    });
}

function CreateGame(props) {
    return (
        <button type="button" className="btn btn-primary mb-4" onClick={() => createGame(props.onCreated)}>Create Game</button>
    );
}

export default CreateGame;
