import Title from './Title';
import Menu from './menu/Menu';
import { Outlet } from "react-router-dom";

function App(props) {
    return (
        <div>
            <div><Title /></div>
            <div className="d-grid container">
                <div className="row align-items-center" style={{ height: "90vh" }}>
                    <div className="col-4">
                        <Menu />
                    </div>
                    <div className="col-8 text-center">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
