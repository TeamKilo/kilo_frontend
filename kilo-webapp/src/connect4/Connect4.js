import Connect4Grid from "./Connect4Grid";
import Connect4Players from "./Connect4Players";

function Connect4(props) {
    return (
        <div>
            <h2>Connect 4</h2>
            <Connect4Grid gridState={props.gameState.board} />
            <div class="text-center">
                <Connect4Players names={props.gameState.players} />
            </div>
        </div>
    );
}

export default Connect4;
