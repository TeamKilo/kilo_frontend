function Welcome() {
    return (
        <div className="card mb-2">
            <div className="card-header"><h4>Welcome to Kilo</h4></div>
            <div className="card-body">
                <p>To view the state of an existing game, type its game ID and click View.</p>
                <p>Click List Games to view a list of the games currently in the system.</p>
                <p>To create a new game, select the type of game you want to create and click Create. You will then be taken to a visualisation of the new game which contains its ID.</p>
                <p>If you are viewing a game which is waiting for players, you may join as a player and submit moves.</p>
                <p className="mb-0">Click View API Docs to explore the API used to communicate with the server. This can be used to write your own bots.</p>
            </div>
        </div>
    );
}

export default Welcome;
