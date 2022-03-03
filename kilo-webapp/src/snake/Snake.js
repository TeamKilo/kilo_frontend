import axios from "axios";
import React from "react";
import SnakeCanvas from "./SnakeCanvas";
import SnakeControls from "./SnakeControls";
import Players from "../Players";

class Snake extends React.Component {
    constructor(props) {
        super(props);

        this.submitMove = this.submitMove.bind(this);

        this.snakeColours = [
            [35, 201, 255, 255],
            [255, 255, 0, 255],
            [203, 99, 207, 255],
            [0, 0, 0, 255]
        ]
    }

    submitMove(direction) {
        axios.post("https://team-kilo-server.herokuapp.com/api/" + this.props.gameID + "/submit-move", { session_id: this.props.sessionID, payload: {direction: direction, game_type: "snake"} });
    }

    render() {
        return (
            <>
                <SnakeCanvas
                    players={this.props.gameState.players}
                    positions={this.props.gameState.payload.players}
                    fruits={this.props.gameState.payload.fruits}
                    worldMax={this.props.gameState.payload.world_max}
                    worldMin={this.props.gameState.payload.world_min}
                    colours={this.snakeColours}
                />
                {this.props.sessionID === undefined ? null : <SnakeControls submitMove={this.submitMove} />}
                <Players names={this.props.gameState.players} colours={this.snakeColours.map(colour => `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`)} />
            </>
        );
    }
}

export default Snake;
