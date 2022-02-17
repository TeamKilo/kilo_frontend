import axios from "axios";
import React from "react";
import Connect4 from "../connect4/Connect4";
import BadGameID from "./BadGameID";
import JoinAsPlayer from "./JoinAsPlayer";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game_type: "none",
            game_state: {},
        }

        this.controller = new AbortController();
    }

    componentDidMount() {
        this.waitForUpdate(0);
    }

    componentWillUnmount() {
        this.controller.abort();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gameID !== this.props.gameID) {
            this.controller.abort();
            this.setState({
                game_type: "none",
                game_state: {}
            });
            this.waitForUpdate(0);
        }
    }

    getGameState() {
        axios.get(`https://team-kilo-server.herokuapp.com/api/${this.props.gameID}/get-state`).then(res => {
            let board = [[], [], [], [], [], []];
            const col_height = 6;
            if (res.data.payload.length === 0) {
                board = board.map(l => [0, 0, 0, 0, 0, 0, 0]);
            } else {
                res.data.payload.cells.forEach((col) => {
                    for (var y = 0; y < col_height; y++) {
                        if (y < col.length) {
                            if (col[y] === res.data.players[0]) {
                                board[(col_height - 1) - y].push(1);
                            } else if (col[y] === res.data.players[1]) {
                                board[(col_height - 1) - y].push(2);
                            }
                        } else {
                            board[(col_height - 1) - y].push(0);
                        }
                    }
                });
            }
            this.setState({
                game_state: { board: board, players: res.data.players, status: res.data.state, winners: res.data.winners, canMove: res.data.can_move },
                game_type: res.data.game
            });
        });
    }
    
    waitForUpdate(since) {
        if (this.state.game_type !== "bad_id") {
            axios.get(
                `https://team-kilo-server.herokuapp.com/api/${this.props.gameID}/wait-for-update?since=${since}`,
                {signal: this.controller.signal}
            ).then(res => {  
                if (res.data.clock > since) {
                    this.getGameState();
                }
                this.waitForUpdate(res.data.clock);
            }).catch(error => {
                if (!axios.isCancel(error)) {
                    if (error.response.status === 400) {
                        this.setState({ game_type: "bad_id" });
                    } else {
                        this.getGameState();
                        this.waitForUpdate(since);
                    }
                }
            });
        }
    }

    render() {
        if (this.state.game_type === "bad_id") {
            return <BadGameID />;
        } else if (this.state.game_type === "connect_4") {
            return (
                <div className="card">
                    <div className="card-header"><h4>Connect 4</h4></div>
                    <div className="card-body">
                        <Connect4
                            gameState={this.state.game_state}
                            gameID={this.props.gameID}
                            sessionID={this.props.sessionID} />
                        {this.state.game_state.status === "waiting" && this.props.onJoinAsPlayer !== undefined ? <JoinAsPlayer gameID={this.props.gameID} onGameJoined={this.props.onJoinAsPlayer}/> : null}
                    </div>
                    <div className="card-footer text-muted" id="game-id-container">
                        Game ID: <span id="game-id-display">{this.props.gameID}</span>
                    </div>
                </div>
            );
        } else if (this.state.game_type === "none") {
            return (
                <div className="alert alert-primary" role="alert">
                    Loading...
                </div>
            );
        } else {
            return (
                <div className="alert alert-danger" role="alert">
                    An error occurred.
                </div>
            );
        }
    }
}

export default Game;
