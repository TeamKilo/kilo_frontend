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
                const games = response.data.map((gameData) => {
                    let game = {};

                    if (gameData.game_type === "connect_4") {
                        game.type = "Connect 4";
                    } else {
                        game.type = "Unknown";
                    }

                    if (gameData.stage === "waiting") {
                        game.stage = "waiting for players";
                    } else if (gameData.stage === "in_progress") {
                        game.stage = "in progress";
                    } else if (gameData.stage === "ended") {
                        game.stage = "ended";
                    }

                    game.players = gameData.players;
                    game.gameID = gameData.game_id;
                    game.lastUpdated = gameData.last_updated;

                    return game;
                });
                games.sort((a, b) => a.lastUpdated < b.lastUpdated ? 1 : a.lastUpdated === b.lastUpdated ? 0 : -1);
                this.setState({error: false, games: games});
            })
            .catch((error) => {
                this.setState({error: true});
            })
    }

    render() {
        let content = <div className="alert alert-danger" role="alert">An error occurred while fetching games.</div>;

        if (!this.state.error) {
            const games = this.state.games.map((game) => {
                let players = "none.";
                if (game.players.length > 0) {
                    players = game.players.map((name) => <React.Fragment key={name}><span className="badge bg-secondary">{name.substring(0, 32)}</span><span> </span></React.Fragment>);
                }
                return (
                    <Link key={game.gameID} to={"/view/" + game.gameID} className="list-group-item list-group-item-action">
                        <h5 className="mb-1">{game.gameID}</h5>
                        <small className="text-muted">{game.type}, {game.stage}.</small>
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
            <>
                <div className="card">
                    <div className="card-header"><h4>Current Games</h4></div>
                    <div className="card-body">
                        <button className="btn btn-primary mb-2" onClick={this.refresh}>Refresh</button>
                        {content}
                    </div>
                </div>
            </>
        );
    }
}

export default ListGames;
