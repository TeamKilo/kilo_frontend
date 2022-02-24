import { playerElements } from "../utils";

function Status(props) {
    if (props.stage === "waiting") {
        return <p className="text-muted mb-0">Waiting for players.</p>;
    } else if (props.stage === "in_progress") {
        return <p className="text-muted mb-0">Waiting for {playerElements(props.canMove)} to move.</p>;
    } else if (props.stage === "ended") {
        if (props.winners.length === 0) {
            return <p className="text-muted mb-0">The game is over and no one has won.</p>
        } else {
            return <p className="text-muted mb-0">{playerElements(props.winners)} {props.winners.length === 1 ? "has" : "have"} won.</p>;
        }
    }
    return null;
}

export default Status;
