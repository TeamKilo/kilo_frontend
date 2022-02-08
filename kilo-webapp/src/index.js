import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import ListGames from './ListGames';
import ViewGame from './viewgame/ViewGame';
import NoMatch from './NoMatch';
import Welcome from './Welcome';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Welcome />} />
                    <Route path="list" element={<ListGames />} />
                    <Route path="view/:id" element={<ViewGame />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
