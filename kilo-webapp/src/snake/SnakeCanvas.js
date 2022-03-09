import React from "react";

class SnakeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.fruitColours = [249, 87, 56];
        this.size = {x: 440, y: 440};
    }

    getScaleX() {
        return this.size.x / (this.props.worldMax.x - this.props.worldMin.x + 1);
    }

    getScaleY() {
        return this.size.y / (this.props.worldMax.y - this.props.worldMin.y + 1);
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
                    this.setColour(this.translatePosition(position), this.props.colours[index]);
                });
                let horizontal = this.props.positions[player].length > 1 ? this.props.positions[player][0].x - this.props.positions[player][1].x !== 0 : true;
                this.drawEyes(this.translatePosition(this.props.positions[player][0]), horizontal);
            }
        });
    }
    
    translatePosition(position) {
        return {x: position.x - this.props.worldMin.x, y: this.props.worldMax.y - position.y};
    }
    
    setColour(position, colour) {
        this.ctx.fillStyle = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
        this.ctx.fillRect(position.x * this.getScaleX(), position.y * this.getScaleY(), this.getScaleX(), this.getScaleY());
    }

    drawEyes(position, horizontal=true) {
        

        const drawEye = (x, y) => {
            this.ctx.beginPath();
            this.ctx.arc(x, y, 7, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = 'black';
            this.ctx.fill();
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = 'white';
            this.ctx.stroke();
        }

        if (horizontal) {
            drawEye((position.x + 0.5) * this.getScaleX(), (position.y + 0.25) * this.getScaleY());
            drawEye((position.x + 0.5) * this.getScaleX(), (position.y + 0.75) * this.getScaleY());
        } else {
            drawEye((position.x + 0.25) * this.getScaleX(), (position.y + 0.5) * this.getScaleY());
            drawEye((position.x + 0.75) * this.getScaleX(), (position.y + 0.5) * this.getScaleY());
        }

        
    }

    render() {
        if (this.ctx !== undefined) {
            this.drawCanvas();
        }

        return (
            <div id="canvas-container">
                <canvas id="snake-canvas" width={this.size.x} height={this.size.y} />
            </div>
        );
    }
}

export default SnakeCanvas;
