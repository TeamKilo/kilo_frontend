import React from "react";

function Connect4Players(props) {
    return (
        <React.Fragment>
            {[0, 1].map(index =>
                <p key={index}><span className={"player" + (index + 1)}>▉</span> {props.names.length > index ? props.names[index] : "waiting for player..."}</p>
            )}
        </React.Fragment>
    );
}

export default Connect4Players;
