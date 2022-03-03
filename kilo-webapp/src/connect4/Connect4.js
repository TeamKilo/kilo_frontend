import React from "react";
import Connect4Grid from "./Connect4Grid";
import Players from "../Players";
import axios from "axios"

class Connect4 extends React.Component {
    constructor(props) {
        super(props);

        this.submitMove = this.submitMove.bind(this);
    }

    submitMove(column) {
        axios.post("https://team-kilo-server.herokuapp.com/api/" + this.props.gameID + "/submit-move", { session_id: this.props.sessionID, payload: {column: column, game_type: "connect_4"} })
        .catch((error) => {
            alert("Failed to submit move. Make sure it is your turn!");
        });
    }

    parseGrid(cells, players) {
        let board = [[], [], [], [], [], []];
        const col_height = 6;

        cells.forEach((col) => {
            for (var y = 0; y < col_height; y++) {
                if (y < col.length) {
                    if (col[y] === players[0]) {
                        board[(col_height - 1) - y].push(1);
                    } else if (col[y] === players[1]) {
                        board[(col_height - 1) - y].push(2);
                    }
                } else {
                    board[(col_height - 1) - y].push(0);
                }
            }
        });

        return board;
    }

    render() {
        return (
            <>
                <Connect4Grid
                    gridState={this.parseGrid(this.props.gameState.payload.cells, this.props.gameState.players)}
                    onColumnClicked={this.props.sessionID === undefined ? undefined : this.submitMove} />
                <Players names={this.props.gameState.players} colours={["red", "yellow"]} />
                {this.props.sessionID === undefined ? null : <p className="text-muted mb-2">Click on the columns to submit your moves.</p>}
            </>

        );
    }
}

export default Connect4;
