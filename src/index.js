import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// I'm using https://github.com/ampedandwired/html-webpack-plugin which creates the
// index.html for me, but it's default template does not include a div within the
// body to bind to, so I'll create the div that we are binding React into here.
ReactDOM.render(
    <App />,
     document.body.appendChild(document.createElement('div'))
);
