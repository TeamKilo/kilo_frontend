import React from "react";
import Connect4Grid from "./Connect4Grid";
import Connect4Players from "./Connect4Players";

function Connect4(props) {
    return (
        <React.Fragment>
            <h2>Connect 4</h2>
            <Connect4Grid gridState={props.gameState.board} />
            <Connect4Players names={props.gameState.players} />
        </React.Fragment>
    );
}

export default Connect4;
