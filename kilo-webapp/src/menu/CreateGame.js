import React from "react";
import axios from "axios";

class CreateGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {gameType: "connect_4"};

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({gameType: event.target.value});
    }

    onSubmit(event) {
        axios.post("https://team-kilo-server.herokuapp.com/api/create-game", { game_type: this.state.gameType })
        .then((res) => {
            const game_id = res.data.game_id;
            this.props.onCreated(game_id);
        })
        .catch((error) => {
            alert("Failed to create game.");
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="d-flex row">
                    <div className="col-9">
                        <select className="form-select" value={this.state.gameType} onChange={this.onChange}>
                            <option value="connect_4">Connect 4</option>
                            <option value="snake">Snake</option>
                        </select>
                    </div>
                    <div className="col-2 mr-auto">
                        <button type="submit" className="btn btn-primary mb-2">Create</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default CreateGame;
