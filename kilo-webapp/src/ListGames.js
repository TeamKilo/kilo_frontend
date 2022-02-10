import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ListGames extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: false,
            games: []
        }
        
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        axios.get("https://team-kilo-server.herokuapp.com/api/list-games")
            .then((response) => {
                for (let id of response.data) {
                    this.setState({[id]: {type: "Loading...", status: "Loading...", players: []}});
                    axios.get("https://team-kilo-server.herokuapp.com/api/" + id + "/get-state")
                        .then((response) => {
                            let game = {};
                            if (response.data.game === "connect_4") {
                                game.type = "Connect 4";
                            } else {
                                game.type = "Unknown";
                            }
                            if (response.data.state === "waiting") {
                                game.status = "waiting for players";
                            } else if (response.data.state === "in_progress") {
                                game.status = "in progress";
                            } else if (response.data.state === "ended") {
                                game.status = "ended";
                            }
                            game.players = response.data.players;
                            this.setState({[id]: game});
                        })
                        .catch((error) => {
                            this.setState({error: true});
                        })
                }
                this.setState({error: false, games: response.data});
            })
            .catch((error) => {
                this.setState({error: true});
            })
    }

    render() {
        let content = <div className="alert alert-danger" role="alert">An error occurred while fetching games.</div>;

        if (!this.state.error) {
            const games = this.state.games.map((id) => {
                let players = "none.";
                if ((typeof this.state[id].players) === "object" && (typeof this.state[id].players.length) === "number" && this.state[id].players.length > 0) {
                    players = this.state[id].players.map((name) => <><span className="badge bg-secondary" key={name}>{name.substring(0, 32)}</span><span> </span></>);
                }
                return (
                    <Link key={id} to={"/view/" + id} className="list-group-item list-group-item-action">
                        <h5 className="mb-1">{id}</h5>
                        <small className="text-muted">{this.state[id].type}, {this.state[id].status}.</small>
                        <p className="mb-1">Players: {players}</p>
                    </Link>
                );
            });
            content = (
                <div className="list-group" id="gamelist">
                    {games}
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-header"><h4>Current Games</h4></div>
                    <div className="card-body">
                        <button className="btn btn-primary mb-2" onClick={this.refresh}>Refresh</button>
                        {content}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ListGames;
