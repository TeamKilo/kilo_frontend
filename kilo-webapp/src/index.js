import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import ListGames from './ListGames';
import ViewGame from './game/ViewGame';
import NoMatch from './NoMatch';
import Welcome from './Welcome';
import PlayGame from './game/PlayGame';
import Docs from './Docs';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Welcome />} />
                    <Route path="list" element={<ListGames />} />
                    <Route path="view/:gameid" element={<ViewGame />} />
                    <Route path="play/:gameid/:sessionid" element={<PlayGame />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
                <Route path="docs" element={<Docs />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
