import Connect4 from "./connect4/Connect4";
import NoGame from "./NoGame";

function GameView(props) {
    const gameName = props.gameName;
    const gameState = props.gameState;

    let element = (
        <div className="alert alert-danger" role="alert">
            Error: unrecognised game.
        </div>
    );

    if (gameName === "none") {
        element = (
            <NoGame />
        );
    } else if (gameName === "connect_4") {
        element = (
            <Connect4 gameState={gameState} />
        );
    }

    return element;
}

export default GameView;
