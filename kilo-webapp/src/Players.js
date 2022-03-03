import React from "react";

function Players(props) {
    return (
        <>
            {props.colours.map((colour, index) =>
                <p key={index} className="mt-2">
                    <span style={{color: colour}}>▉ </span>
                    <span className="badge bg-secondary">{props.names.length > index ? props.names[index] : "Waiting for player..."}</span>
                </p>
            )}
        </>
    );
}

export default Players;
