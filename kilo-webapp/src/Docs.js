import React from 'react';
import 'rapidoc';

function Docs() {
    return (
        <rapi-doc
            spec-url="https://team-kilo-server.herokuapp.com/static/openapi.yaml"
            render-style="read"
            show-header="false"
            allow-server-selection="false"
            allow-authentication="false"
            theme="light" />

    );
}

export default Docs;
