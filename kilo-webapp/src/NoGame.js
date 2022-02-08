function NoGame() {
    return (
        <div className="card">
            <div className="card-header"><h4>Welcome to Kilo</h4></div>
            <div className="card-body">
                <p>To view the state of an existing game, type its game ID and click view.</p>
                <p className="mb-0">To create a new game, click Create Game. You will then be told the new game's ID.</p>
            </div>
        </div>
    );
}

export default NoGame;
