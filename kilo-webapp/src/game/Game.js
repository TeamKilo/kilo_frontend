import axios from "axios";
import React from "react";
import Connect4 from "../connect4/Connect4";
import Snake from "../snake/Snake";
import { humanFriendly } from "../utils";
import BadGameID from "./BadGameID";
import JoinAsPlayer from "./JoinAsPlayer";
import Status from "./Status";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameState: {}
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
            this.controller = new AbortController();
            this.setState({gameState: {}});
            this.waitForUpdate(0);
        }
    }

    getGameState() {
        axios.get(`https://team-kilo-server.herokuapp.com/api/${this.props.gameID}/get-state`).then(res => {
            this.setState({
                gameState: res.data
            });
        });
    }
    
    waitForUpdate(since) {
        if (this.state.gameState !== null) {
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
                    if (error.response.status === 400 || error.response.status === 404) {
                        this.setState({ gameState: null });
                    } else {
                        this.getGameState();
                        this.waitForUpdate(since);
                    }
                }
            });
        }
    }

    wrapGameComponent(gameComponent) {
        return (
            <div className="card mb-2">
                <div className="card-header"><h4>{humanFriendly(this.state.gameState.payload.game_type)}</h4></div>
                <div className="card-body">
                    {gameComponent}
                    <Status stage={this.state.gameState.stage} winners={this.state.gameState.winners} canMove={this.state.gameState.can_move} />
                    {this.state.gameState.stage === "waiting" && this.props.onJoinAsPlayer !== undefined ? <JoinAsPlayer gameID={this.props.gameID} onGameJoined={this.props.onJoinAsPlayer}/> : null} 
                    {
                    this.props.sessionID !== undefined ?
                        <p className="mt-2 mb-0 text-muted">
                            Warning: if you leave this page without making a note of the session ID below, you will not be able to submit moves.
                            You may also save the URL of this page, which contains the session ID.
                        </p> :
                        null
                    } 
                </div>
                <div className="card-footer text-muted" id="game-id-container">
                    Game ID: <span className="selectable">{this.props.gameID}</span>
                    {
                    this.props.sessionID !== undefined ?
                        <> • Session ID: <span className="selectable">{this.props.sessionID}</span></> :
                        null
                    }
                </div>
            </div>
        );
    }

    render() {
        if (this.state.gameState === null) {
            return <BadGameID />;
        } else if (Object.keys(this.state.gameState).length === 0) {
            return (
                <div className="alert alert-primary" role="alert">
                    Loading...
                </div>
            );
        } else if (this.state.gameState.payload !== undefined && this.state.gameState.payload.game_type === "connect_4") {
                return this.wrapGameComponent(
                    <Connect4
                        gameState={this.state.gameState}
                        gameID={this.props.gameID}
                        sessionID={this.props.sessionID} />
                );
        } else if (this.state.gameState.payload !== undefined && this.state.gameState.payload.game_type === "snake") {
                return this.wrapGameComponent(
                    <Snake
                        gameState={this.state.gameState}
                        gameID={this.props.gameID}
                        sessionID={this.props.sessionID} />
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
