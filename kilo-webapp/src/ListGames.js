import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { humanFriendly, playerElements } from './utils';

class ListGames extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: false,
            games: [],
            page: 1,
            maxPage: 1,
            sortOrder: "desc",
            sortKey: "last_updated",
            gameType: "any",
            players: "any",
            stage: "any"
        }
        
        this.refresh = this.refresh.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.updateSortOrder = this.updateSortOrder.bind(this);
        this.updateSortKey = this.updateSortKey.bind(this);
        this.updateGameType = this.updateGameType.bind(this);
        this.updatePlayers = this.updatePlayers.bind(this);
        this.updateStage = this.updateStage.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page
            || prevState.sortOrder !== this.state.sortOrder
            || prevState.sortKey !== this.state.sortKey
            || prevState.gameType !== this.state.gameType
            || prevState.players !== this.state.players
            || prevState.stage !== this.state.stage) {
                this.refresh();
        }
    }

    nextPage() {
        this.setState((state, props) => ({page: state.page + 1}));
    }

    prevPage() {
        this.setState((state, props) => ({page: Math.max(state.page - 1, 1)}));
    }

    updateSortOrder(event) {
        this.setState({sortOrder: event.target.value, page: 1});
    }

    updateSortKey(event) {
        this.setState({sortKey: event.target.value, page: 1});
    }

    updateGameType(event) {
        this.setState({gameType: event.target.value, page: 1});
    }

    updatePlayers(event) {
        this.setState({players: event.target.value, page: 1});
    }

    updateStage(event) {
        this.setState({stage: event.target.value, page: 1});
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        this.setState({games: []});
        
        const params = {
            page: this.state.page,
            sort_order: this.state.sortOrder,
            sort_key: this.state.sortKey,
            game_type: this.state.gameType === "any" ? null : this.state.gameType,
            players: this.state.players === "any" ? null : this.state.players,
            stage: this.state.stage === "any" ? null : this.state.stage
        };

        axios.get("https://team-kilo-server.herokuapp.com/api/list-games", {params: params})
            .then((response) => {
                const games = response.data.game_summaries.map((gameData) => {
                    let game = {};

                    game.type = humanFriendly(gameData.game_type);

                    if (gameData.stage === "waiting") {
                        game.stage = "waiting for players";
                    } else if (gameData.stage === "in_progress") {
                        game.stage = "in progress";
                    } else if (gameData.stage === "ended") {
                        game.stage = "ended";
                    }

                    game.players = gameData.players;
                    game.gameID = gameData.game_id;

                    return game;
                });
                const numberOfPages = Math.trunc((response.data.number_of_games / 20) + 1);
                this.setState((prevState) => ({error: false, games: games, maxPage: numberOfPages, page: Math.min(numberOfPages, prevState.page)}));
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
                    players = playerElements(game.players);
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
                    {games.length === 0 ? <p className="text-muted">No games to display.</p> : games}
                </div>
            );
        }

        return (
            <>
                <div className="card">
                    <div className="card-header"><h4>Current Games</h4></div>
                    <div className="card-body">
                        <div className="row mb-2 align-items-end">
                            <div className="col-sm">
                                <label htmlFor="sortby" className="col-form-label">Sort by</label>
                                <select id="sortby" className="form-select" value={this.state.sortKey} onChange={this.updateSortKey}>
                                    <option value="last_updated">Updated</option>
                                    <option value="game_type">Type</option>
                                    <option value="players">Players</option>
                                    <option value="stage">Stage</option>
                                </select>
                            </div>
                            <div className="col-sm">
                                <label htmlFor="sortorder" className="col-form-label">Order</label>
                                <select id="sortorder" className="form-select" value={this.state.sortOrder} onChange={this.updateSortOrder}>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                            <div className="col-sm">
                                <label htmlFor="gametype" className="col-form-label">Game</label>
                                <select id="gametype" className="form-select" value={this.state.gameType} onChange={this.updateGameType}>
                                    <option value="any">Any</option>
                                    <option value="connect_4">Connect 4</option>
                                    <option value="snake">Snake</option>
                                </select>
                            </div>
                            <div className="col-sm">
                                <label htmlFor="players" className="col-form-label">Players</label>
                                <select id="players" className="form-select" value={this.state.players} onChange={this.updatePlayers}>
                                    <option value="any">Any</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="col-sm">
                                <label htmlFor="stage" className="col-form-label">Stage</label>
                                <select id="stage" className="form-select" value={this.state.stage} onChange={this.updateStage}>
                                    <option value="any">Any</option>
                                    <option value="waiting">Waiting</option>
                                    <option value="in_progress">In progress</option>
                                    <option value="ended">Ended</option>
                                </select>
                            </div>
                            <div className="col-sm-1">
                                <button className="btn btn-primary mt-2" onClick={this.refresh}>⟳</button>
                            </div>
                         </div>
                        {content}
                        <p className="mb-0 mt-2">
                            <span className="link-primary" style={{cursor: "pointer", visibility: this.state.page === 1 ? "hidden" : "visible"}} onClick={this.prevPage}>{"<-"} </span>
                            Page {this.state.page} of {this.state.maxPage}
                            <span className="link-primary" style={{cursor: "pointer", visibility: this.state.page < this.state.maxPage ? "visible" : "hidden"}} onClick={this.nextPage}> {"->"}</span>
                        </p>
                    </div>
                </div>
            </>
        );
    }
}

export default ListGames;
