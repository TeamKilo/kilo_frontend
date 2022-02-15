import React from "react";
import Connect4Grid from "./Connect4Grid";
import Connect4Players from "./Connect4Players";
import Status from "./Status";

function Connect4(props) {
    return (
        <>
            <Status status={props.gameState.status} winners={props.gameState.winners} canMove={props.gameState.canMove} />
            <Connect4Grid gridState={props.gameState.board} />
            <Connect4Players names={props.gameState.players} />
        </>

    );
}

export default Connect4;
