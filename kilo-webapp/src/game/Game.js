import axios from "axios";
import React from "react";
import Connect4 from "../connect4/Connect4";
import BadGameID from "./BadGameID";
import JoinAsPlayer from "./JoinAsPlayer";
import SubmitMove from "./SubmitMove";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game_type: "none",
            game_state: {},
        }
 
        this.aborter = new AbortController();
    }

    componentDidMount() {
        this.getGameState();
        this.waitForMove();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gameID !== this.props.gameID) {
            this.setState({
                game_type: "none",
                game_state: {}
            });
            this.aborter.abort();
            this.getGameState();
            this.waitForMove();
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
        }).catch(error => {
            if (error.response.status === 400) {
                this.setState({ game_type: "bad_id" });
            }
        });
    }
    
    waitForMove() {
        setTimeout(() => this.waitForMove(), 4000);
        axios.get(
            `https://team-kilo-server.herokuapp.com/api/${this.props.gameID}/wait-for-update`,
            {signal: this.aborter.signal}
        ).then(res => {  
            if (res.data.updated) {
                this.getGameState();
            }
        }).catch(e => {
            if (e.constructor.name !== "Cancel") {
                console.log(e);
                if (e.response !== undefined) {
                    if (e.response.status === 400) {
                        this.setState({ game_state: "bad_id" });
                    }
                }
            }
        });
    }

    render() {
        if (this.state.game_type === "bad_id") {
            return <BadGameID />;
        } else if (this.state.game_type === "connect_4") {
            return (
                <div className="card">
                    <div className="card-header"><h4>Connect 4</h4></div>
                    <div className="card-body">
                        <Connect4 gameState={this.state.game_state} gameID={this.props.gameID} />
                        {this.state.game_state.status === "waiting" && !this.props.playing ? <JoinAsPlayer gameID={this.props.gameID} onGameJoined={this.props.onJoinAsPlayer}/> : null}
                        {this.props.playing ? <SubmitMove gameID={this.props.gameID} sessionID={this.props.sessionID}/> : null}
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
