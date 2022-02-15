import React from "react";
import axios from "axios";

class SubmitMove extends React.Component {
    constructor(props) {
        super(props);

        this.state = {move: "1"};

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gameID !== this.props.gameID) {
            this.setState({
                move: "1",
            });
        }
    }

    onChange(event) {
        this.setState({move: event.target.value});
    }

    onSubmit(event) {
        this.submitMove();
        event.preventDefault();
    }

    submitMove() {
        axios.post("https://team-kilo-server.herokuapp.com/api/" + this.props.gameID + "/submit-move", { session_id: this.props.sessionID, payload: {column: parseInt(this.state.move - 1)} })
        .catch((error) => {
            alert("Failed to submit move. Make sure it is your turn!");
        });
    }

    render() {
        return (
            <>
                <form onSubmit={this.onSubmit} className="mt-4">
                    <select className="form-select mb-2 w-25 ms-auto me-auto" value={this.state.move} onChange={this.onChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                    <button type="submit" className="btn btn-primary mb-2">Submit Move</button>
                </form>
            </>
        );
    }
}

export default SubmitMove;
