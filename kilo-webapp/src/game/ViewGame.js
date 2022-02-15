import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Game from "./Game";

function ViewGame(props) {
    let params = useParams();
    const gameID = params.gameid;

    let navigate = useNavigate();

    return <Game gameID={gameID} playing={false} onJoinAsPlayer={(sessionID) => {navigate("/play/" + gameID + "/" + sessionID)}} />;
}

export default ViewGame;
