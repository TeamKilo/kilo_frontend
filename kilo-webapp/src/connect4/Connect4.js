import React from "react";
import Connect4Grid from "./Connect4Grid";
import Connect4Players from "./Connect4Players";
import Status from "./Status";

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
                <Status status={this.props.gameState.status} winners={this.props.gameState.winners} canMove={this.props.gameState.canMove} />
            </>

        );
    }
}

export default Connect4;
