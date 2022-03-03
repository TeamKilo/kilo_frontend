import React from "react";

class SnakeControls extends React.Component {
    constructor(props) {
        super(props);

        this.keyboardListener = (e) => {
            if (e.code === "ArrowUp") {
                props.submitMove("up");
            } else if (e.code === "ArrowDown") {
                props.submitMove("down");
            } else if (e.code === "ArrowLeft") {
                props.submitMove("left");
            } else if (e.code === "ArrowRight") {
                props.submitMove("right");
            }
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyboardListener);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyboardListener);
    }

    render() {
        return (
            <>
                <button type="button" className="btn btn-primary" style={{width: "2.5em"}} onClick={() => this.props.submitMove("up")}>↑</button>
                <br />
                <button type="button" className="btn btn-primary" style={{width: "2.5em", marginRight: "1.25em"}} onClick={() => this.props.submitMove("left")}>←</button>
                <button type="button" className="btn btn-primary" style={{width: "2.5em", marginLeft: "1.25em"}} onClick={() => this.props.submitMove("right")}>→</button>
                <br />
                <button type="button" className="btn btn-primary mb-4" style={{width: "2.5em"}} onClick={() => this.props.submitMove("down")}>↓</button>
            
            </>
        );
    }
}

export default SnakeControls;
