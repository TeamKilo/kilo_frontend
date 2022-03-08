import React from "react";

class SnakeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.fruitColours = [249, 87, 56];
        this.size = {x: 440, y: 440};
    }

    getScaleX() {
        return this.size.x / (this.props.worldMax.x - this.props.worldMin.x + 1)
    }

    getScaleY() {
        return this.size.y / (this.props.worldMax.y - this.props.worldMin.y + 1)
    }

    componentDidMount() {
        this.canvas = document.getElementById("snake-canvas");
        this.canvas.style.imageRendering = "pixelated";
        this.ctx = this.canvas.getContext("2d");
        this.drawCanvas();
    }

    drawCanvas() {
        this.ctx.clearRect(0, 0, this.size.x, this.size.y);
        this.props.fruits.forEach(position => {
            this.setColour(position, this.fruitColours);
        });
        this.props.players.forEach((player, index) => {
            if (player in this.props.positions) {
                this.props.positions[player].forEach(position => {
                    this.setColour(position, this.props.colours[index]);
                });
            }
        });
    }

    setColour(position, colour) {
        if (position.x >= this.props.worldMin.x && position.x <= this.props.worldMax.x && position.y >= this.props.worldMin.y && position.y <= this.props.worldMax.y) {
            this.ctx.fillStyle = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
            this.ctx.fillRect(
                (position.x - this.props.worldMin.x) * this.getScaleX(),
                (this.props.worldMax.y - position.y) * this.getScaleY(),
                this.getScaleX(),
                this.getScaleY()
            );

        }
    }

    render() {
        if (this.ctx !== undefined) {
            this.drawCanvas()
        }

        return (
            <div id="canvas-container">
                <canvas id="snake-canvas" width={this.size.x} height={this.size.y} />
            </div>
        );
    }
}

export default SnakeCanvas;
