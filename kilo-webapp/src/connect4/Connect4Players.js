import React from "react";

function Connect4Players(props) {
    return (
        <>
            {[0, 1].map(index =>
                <p key={index} className="mt-2">
                    <span className={"player" + (index + 1)}>▉ </span>
                    <span className="badge bg-secondary">{props.names.length > index ? props.names[index].substring(0, 32) : "Waiting for player..."}</span>
                </p>
            )}
        </>
    );
}

export default Connect4Players;
