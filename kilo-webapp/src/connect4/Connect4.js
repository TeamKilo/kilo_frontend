import React from "react";
import Connect4Grid from "./Connect4Grid";
import Connect4Players from "./Connect4Players";

function Connect4(props) {
    return (
        <div className="card">
            <div className="card-header"><h4>Connect 4</h4></div>
            <div className="card-body">
                <Connect4Grid gridState={props.gameState.board} />
                <Connect4Players names={props.gameState.players} />
            </div>
            <div className="card-footer text-muted">
                Game ID: {props.gameID}
            </div>
        </div>
    );
}

export default Connect4;
