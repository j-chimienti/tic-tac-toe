import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min';
window.$ = $;


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
