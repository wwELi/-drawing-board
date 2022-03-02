import React from 'react';
import { render } from 'react-dom';

import Container from './render/container';
import { GlobalStyle } from './render/global';

function App() {
    return <React.Fragment>
        <GlobalStyle/>
        <Container/>
    </React.Fragment>
}

render(<App/>, document.querySelector('#main'));
