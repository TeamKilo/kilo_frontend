import Title from './Title';
import Menu from './menu/Menu';
import { Outlet } from "react-router-dom";
import React from 'react';

function App() {
    return (    
        <div className="d-grid container">
            <Title />
            <div className="row align-items-center" id="surface" style={{ height: "90vh" }}>
                <div className="col-lg-4" id="menu">
                    <Menu />
                </div>
                <div className="col-lg-8 text-center" id="gameview">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;
