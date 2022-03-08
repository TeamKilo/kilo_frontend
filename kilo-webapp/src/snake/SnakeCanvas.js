import React from "react";

class SnakeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.fruitColours = [249, 87, 56, 255];
    }

    getWidth() {
        return this.props.worldMax.x - this.props.worldMin.x + 1;
    }

    getHeight() {
        return this.props.worldMax.y - this.props.worldMin.y + 1;
    }

    componentDidMount() {
        this.canvas = document.getElementById("snake-canvas");
        this.canvas.style.imageRendering = "pixelated";
        this.ctx = this.canvas.getContext("2d");
        this.drawCanvas();
    }

    drawCanvas() {
        this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
        var imageData = this.ctx.getImageData(0, 0, this.getWidth(), this.getHeight());

        this.props.fruits.forEach(position => {
            this.setColour(imageData, position, this.fruitColours);
        });
        this.props.players.forEach((player, index) => {
            if (player in this.props.positions) {
                this.props.positions[player].forEach(position => {
                    this.setColour(imageData, position, this.props.colours[index]);
                });
            }
        });

        this.ctx.putImageData(imageData, 0, 0);
    }

    setColour(imageData, position, colour) {
        if (position.x >= this.props.worldMin.x && position.x <= this.props.worldMax.x && position.y >= this.props.worldMin.y && position.y <= this.props.worldMax.y) {
            var offset = ((this.getHeight() - (position.y - this.props.worldMin.y) - 1) * imageData.width + (position.x - this.props.worldMin.x)) * 4;
            colour.forEach((value, index) => imageData.data[offset + index] = value);
        }
    }

    render() {
        if (this.ctx !== undefined) {
            this.drawCanvas()
        }

        return (
            <div id="canvas-container">
                <canvas id="snake-canvas" width={this.getWidth()} height={this.getHeight()} />
            </div>
        );
    }
}

export default SnakeCanvas;
