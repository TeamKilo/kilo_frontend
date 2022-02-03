import Connect4Grid from "./Connect4Grid";

function GameView(props) {
    const gameName = props.gameName;
    const gameState = props.gameState;
    let element = (
        <div className="alert alert-danger" role="alert">
            Error: unrecognised game.
        </div>
    );

    if (gameName === "connect_4") {
        element = (
            <Connect4Grid gridState={gameState.board} />
        );
    }

    return element;
}

export default GameView;
