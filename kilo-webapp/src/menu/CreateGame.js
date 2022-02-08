import React from "react";

function CreateGame(props) {
    const createdIDElement = props.createdID === null ? null : <div className="alert alert-success" role="alert">Created game with ID: {props.createdID}</div>;
    return (
        <React.Fragment>
            <button type="button" className="btn btn-primary" onClick={props.createGame}>Create Game</button>
            {createdIDElement}
        </React.Fragment>
    );
}

export default CreateGame;
