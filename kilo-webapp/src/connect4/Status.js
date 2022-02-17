function Status(props) {
    if (props.stage === "waiting") {
        return <p className="text-muted mb-0">Waiting for players.</p>;
    } else if (props.stage === "in_progress") {
        return <p className="text-muted mb-0">Waiting for <span className="badge bg-secondary">{props.canMove[0]}</span> to move.</p>;
    } else if (props.stage === "ended") {
        if (props.winners.length === 0) {
            return <p className="text-muted mb-0">The game is over and no one has won.</p>
        } else {
            return <p className="text-muted mb-0"><span className="badge bg-secondary">{props.winners[0]}</span> has won.</p>;
        }
    }
    return null;
}

export default Status;
