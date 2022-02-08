function BadGameID() {
    return (
        <div className="card text-white bg-danger mb-3">
            <div className="card-header text-center">Invalid Game ID</div>
            <div className="card-body">
                <p className="card-text text-center">No game with the provided ID could be found</p>
            </div>
        </div>
    );
}

export default BadGameID;
