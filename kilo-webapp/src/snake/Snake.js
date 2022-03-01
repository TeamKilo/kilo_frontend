import axios from "axios";
import React from "react";
import SnakeControls from "./SnakeControls";

class Snake extends React.Component {
    constructor(props) {
        super(props);

        this.submitMove = this.submitMove.bind(this);
        this.colours = {
            fruit: [249, 87, 56, 255],
            snakes: [
                [35, 201, 255, 255],
                [255, 255, 255, 255],
                [203, 99, 207, 255],
                [0, 0, 0, 255]
            ]
        }
        this.canvasWidth = 200;
        this.canvasHeight = 200;
    }

    componentDidMount() {
        this.canvas = document.getElementById("snake-canvas");
        this.canvas.style.imageRendering = "pixelated";
        this.ctx = this.canvas.getContext("2d");
        this.drawCanvas();
    }

    submitMove(direction) {
        axios.post("https://team-kilo-server.herokuapp.com/api/" + this.props.gameID + "/submit-move", { session_id: this.props.sessionID, payload: {direction: direction, game_type: "snake"} })
        .catch(_ => {
            alert("Failed to submit move. Make sure it is your turn!");
        });
    }

    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        var imageData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);

        this.props.gameState.payload.fruits.forEach(position => {
            this.setColour(imageData, position, this.colours.fruit);
        });
        console.log(this.props.gameState.payload.players);
        this.props.gameState.players.forEach((player, index) => {
            if (player in this.props.gameState.payload.players) {
                this.props.gameState.payload.players[player].forEach(position => {
                    this.setColour(imageData, position, this.colours.snakes[index]);
                });
            }
        });

        this.ctx.putImageData(imageData, 0, 0);
    }

    setColour(imageData, position, colour) {
        var offset = ((this.canvasHeight - (position.y + this.canvasHeight / 2)) * imageData.width + (position.x + this.canvasWidth / 2)) * 4;
        colour.forEach((value, index) => imageData.data[offset + index] = value);
    }

    render() {
        if (this.ctx !== undefined) {
            this.drawCanvas()
        }

        return (
            <React.Fragment>
                <div id="canvas-container">
                    <canvas id="snake-canvas" width={this.canvasWidth} height={this.canvasHeight} />
                </div>
                {this.props.sessionID === undefined ? null : <SnakeControls submitMove={this.submitMove} />}
            </ React.Fragment>
        );
    }
}

export default Snake;
