function Connect4Grid(props) {
    const gridState = props.gridState;

    const tableItems = gridState.map((row, i) => {
        const rowItems = row.map((cell, j) => {
            const colorClass = ["", "player1", "player2"];
            return (<td key={j} className={"connect4cell " + colorClass[cell]}></td>);
        });
        return (<tr key={i}>{rowItems}</tr>);
    });

    return (
        <table className="table table-bordered" id="connect4table">
            <tbody>
                {tableItems}
            </tbody>
        </table>
    );
}

export default Connect4Grid;
