function JoinGame() {
    return (
        <form class="form-inline">
            <div class="input-group">
                <div class="col-10">
                    <input class="form-control" placeholder="Game ID" />
                </div>
                <div class="col-2">
                    <button type="submit" class="btn btn-primary mb-2">Join</button>
                </div>
            </div>
        </form>
    );
}

export default JoinGame;