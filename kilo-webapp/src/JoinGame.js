function JoinGame(props) {
    return (
        <form className="form-inline">
            <div className="input-group">
                <div className="col-10">
                    <input className="form-control" id="game-ID-enter" placeholder="Game ID" />
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-primary mb-2" onClick={() => props.joinGame(document.getElementById("game-ID-enter").value)}>View</button>
                </div>
            </div>
        </form>
    );
}

export default JoinGame;