import React from 'react';
import 'rapidoc';
import Title from './Title';

function Docs() {
    return (
        <div id="docs-container">
            <Title />
            <rapi-doc
                spec-url="https://team-kilo-server.herokuapp.com/static/openapi.yaml"
                render-style="read"
                show-header="false"
                allow-server-selection="false"
                allow-authentication="false"
                theme="light"
                nav-bg-color="#ffffff"
                primary-color="#0d6efd" />
        </div>

    );
}

export default Docs;
