import axios from "axios";
import React from "react";
import Connect4 from "../connect4/Connect4";
import BadGameID from "./BadGameID";

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
        if (prevProps.id !== this.props.id) {
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
        axios.get(`https://team-kilo-server.herokuapp.com/api/${this.props.id}/get-state`).then(res => {
            let board = [[], [], [], [], [], []];
            const col_height = 6;
            if (res.data.payload.length === 0) {
                board = board.map(l => [0, 0, 0, 0, 0, 0, 0]);
            } else {
                res.data.payload.forEach((col) => {
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
                game_state: { board: board, players: res.data.players },
                game_type: res.data.game
            });
        }).catch(error => {
            if (error.response.status === 400) {
                this.setState({ game_type: "bad_id" });
            }
        });
    }
    
    waitForMove() {
        axios.get(
            `https://team-kilo-server.herokuapp.com/api/${this.props.id}/wait-for-update`,
            {signal: this.aborter.signal}
        ).then(res => {  
            if (res.data.updated) {
                this.getGameState();
                this.waitForMove();
            } else {
                setTimeout(() => {
                    this.waitForMove();
                }, 100);
            }
        }).catch(e => {
            if (e.constructor.name !== "Cancel") {
                if (e.response !== undefined) {
                    if (e.response.status === 400) {
                        this.setState({ game_state: "bad_id" });
                    }
                } else {  // Need to distinguish between timeout and other network errors
                    this.waitForMove();  // Timeout
                }
            }
        });
    }

    render() {
        if (this.state.game_type === "bad_id") {
            return <BadGameID />;
        } else if (this.state.game_type === "connect_4") {
            return <Connect4 gameState={this.state.game_state} gameID={this.props.id} />;
        } else if (this.state.game_type === "none") {
            return (
                <div className="alert alert-primary" role="alert">
                    Loading...
                </div>
            );
        } else {
            return (
                <div className="alert alert-danger" role="alert">
                    An error occured.
                </div>
            );
        }
    }
}

export default Game;
