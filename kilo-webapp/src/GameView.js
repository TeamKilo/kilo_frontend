import Connect4 from "./connect4/Connect4";
import NoGame from "./NoGame";
import BadGameID from "./BadGameID";

function GameView(props) {
    const gameName = props.gameName;
    const gameState = props.gameState;

    if (gameName === "none") {
        if (props.badID) {
            return <BadGameID />
        } else {
            return <NoGame />;
        }
    } else if (gameName === "connect_4") {
        return <Connect4 gameState={gameState} />
    }

    return (
        <div className="alert alert-danger" role="alert">
            Error: unrecognised game.
        </div>
    );
}

export default GameView;
