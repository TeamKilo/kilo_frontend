import React from "react";
import { useParams } from "react-router-dom";
import Game from "./Game";

function ViewGame(props) {
    let params = useParams();
    const id = params.id;

    return <Game id={id} />;
}

export default ViewGame;
