import React from "react";
import Connect4Grid from "./Connect4Grid";
import Connect4Players from "./Connect4Players";
import Status from "./Status";
import axios from "axios"

class Connect4 extends React.Component {
    constructor(props) {
        super(props);

        this.submitMove = this.submitMove.bind(this);
    }

    submitMove(column) {
        axios.post("https://team-kilo-server.herokuapp.com/api/" + this.props.gameID + "/submit-move", { session_id: this.props.sessionID, payload: {column: column} })
        .catch((error) => {
            alert("Failed to submit move. Make sure it is your turn!");
        });
    }

    render() {
        return (
            <>
                <Connect4Grid
                    gridState={this.props.gameState.board}
                    onColumnClicked={this.props.sessionID === undefined ? undefined : this.submitMove} />
                <Connect4Players names={this.props.gameState.players} />
                <Status stage={this.props.gameState.stage} winners={this.props.gameState.winners} canMove={this.props.gameState.canMove} />
                {this.props.sessionID === undefined ? null : <p className="text-muted mb-0">Click on the columns to submit your moves.</p>}
            </>

        );
    }
}

export default Connect4;
