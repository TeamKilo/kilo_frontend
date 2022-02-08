function Welcome() {
    return (
        <div className="card">
            <div className="card-header"><h4>Welcome to Kilo</h4></div>
            <div className="card-body">
                <p>To view the state of an existing game, type its game ID and click View.</p>
                <p>Click List Games to view a list of the games currently in the system.</p>
                <p className="mb-0">To create a new game, click Create Game. You will then be taken to a visualisation of the new game which contains its ID.</p>
            </div>
        </div>
    );
}

export default Welcome;
