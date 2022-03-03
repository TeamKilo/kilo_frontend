import React from "react";

class SnakeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.colours = {
            fruit: [249, 87, 56, 255],
            snakes: [
                [35, 201, 255, 255],
                [255, 255, 255, 255],
                [203, 99, 207, 255],
                [0, 0, 0, 255]
            ]
        }
        this.canvasWidth = 100;
        this.canvasHeight = 100;
    }

    componentDidMount() {
        this.canvas = document.getElementById("snake-canvas");
        this.canvas.style.imageRendering = "pixelated";
        this.ctx = this.canvas.getContext("2d");
        this.drawCanvas();
    }

    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        var imageData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);

        this.props.fruits.forEach(position => {
            this.setColour(imageData, position, this.colours.fruit);
        });
        Object.values(this.props.players).forEach((positions, index) => {
            positions.forEach(position => {
                this.setColour(imageData, position, this.colours.snakes[index]);
            });
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
            <div id="canvas-container">
                <canvas id="snake-canvas" width={this.canvasWidth} height={this.canvasHeight} />
            </div>
        );
    }
}

export default SnakeCanvas;
