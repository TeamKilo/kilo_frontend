import React from "react";
import Connect4Grid from "./Connect4Grid";
import Connect4Players from "./Connect4Players";
import Status from "./Status";

function Connect4(props) {
    return (
        <div className="card">
            <div className="card-header"><h4>Connect 4</h4></div>
            <div className="card-body">
                <Status status={props.gameState.status} winners={props.gameState.winners} canMove={props.gameState.canMove} />
                <Connect4Grid gridState={props.gameState.board} />
                <Connect4Players names={props.gameState.players} />
            </div>
            <div className="card-footer text-muted" id="game-id-container">
                Game ID: <span id="game-id-display">{props.gameID}</span>
            </div>
        </div>
    );
}

export default Connect4;
