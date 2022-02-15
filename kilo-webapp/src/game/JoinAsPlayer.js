import React from "react";
import axios from "axios";

class JoinAsPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {username: "", errorText: ""};

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gameID !== this.props.gameID) {
            this.setState({
                username: "",
                errorText: ""
            });
        }
    }

    onChange(event) {
        this.setState({username: event.target.value});
    }

    onSubmit(event) {
        this.join();
        event.preventDefault();
    }

    join() {
        axios.post("https://team-kilo-server.herokuapp.com/api/" + this.props.gameID + "/join-game", { username: this.state.username })
        .then((res) => {
            const sessionID = res.data.session_id;
            this.props.onGameJoined(sessionID);
        })
        .catch((error) => {
            this.setState({errorText: "Failed to join game. Ensure there is space for more players and your username has not already been taken."});
        });
    }

    render() {
        return (
            <>
                <form onSubmit={this.onSubmit}>
                    <input type="text" className="form-control mb-2 w-50 ms-auto me-auto" value={this.state.username} onChange={this.onChange} required="required" placeholder="Username" />
                    <button type="submit" className="btn btn-primary mb-2">Join</button>
                </form>
                {this.state.errorText === "" ? null : <div className="alert alert-danger" role="alert">{this.state.errorText}</div>}
            </>
        );
    }
}

export default JoinAsPlayer;
