import React from "react";

function Connect4Players(props) {
    return (
        <React.Fragment>
            <p><span className="player1">▉</span> {props.names[0]}</p>
            <p><span className="player2">▉</span> {props.names[1]}</p>
        </React.Fragment>
    );
}

export default Connect4Players;
