import axios from "axios";
import React from "react";
import SnakeControls from "./SnakeControls";

class Snake extends React.Component {
    constructor(props) {
        super(props);

        this.submitMove = this.submitMove.bind(this);
    }

    submitMove(direction) {
        axios.post("https://team-kilo-server.herokuapp.com/api/" + this.props.gameID + "/submit-move", { session_id: this.props.sessionID, payload: {direction: direction, game_type: "snake"} })
        .catch((error) => {
            alert("Failed to submit move. Make sure it is your turn!");
        });
    }

    render() {
        return (
            <>
                <p>I am snake.</p>
                {this.props.sessionID === undefined ? null : <SnakeControls submitMove={this.submitMove} />}
            </>
        );
    }
}

export default Snake;
