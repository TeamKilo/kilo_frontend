function Connect4Players(props) {
    return (
        <div>
            <p><span className="player1">▉</span> {props.names[0]}</p>
            <p><span className="player2">▉</span> {props.names[1]}</p>
        </div>
    );
}

export default Connect4Players;
