import axios from "axios";
import React from "react";
import SnakeCanvas from "./SnakeCanvas";
import SnakeControls from "./SnakeControls";

class Snake extends React.Component {
    constructor(props) {
        super(props);

        this.submitMove = this.submitMove.bind(this);
    }

    submitMove(direction) {
        axios.post("https://team-kilo-server.herokuapp.com/api/" + this.props.gameID + "/submit-move", { session_id: this.props.sessionID, payload: {direction: direction, game_type: "snake"} });
    }

    render() {
        return (
            <>
                <SnakeCanvas players={this.props.gameState.payload.players} fruits={this.props.gameState.payload.fruits} />
                {this.props.sessionID === undefined ? null : <SnakeControls submitMove={this.submitMove} />}
            </>
        );
    }
}

export default Snake;
