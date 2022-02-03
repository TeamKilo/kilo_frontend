import React from "react";

class JoinGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {gameID: ""};

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({gameID: event.target.value});
    }

    onSubmit(event) {
        this.props.joinGame(this.state.gameID);
        event.preventDefault();
    }
    
    render() {
        return (
            <form className="form-inline" onSubmit={this.onSubmit}>
                <div className="d-flex row">
                    <div className="col-9">
                        <input type="text" className="form-control" value={this.state.gameID} onChange={this.onChange} required="required" placeholder="Game ID" />
                    </div>
                    <div className="col-2 mr-auto">
                        <button type="submit" className="btn btn-primary mb-2">View</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default JoinGame;
