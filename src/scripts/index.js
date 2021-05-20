import 'regenerator-runtime'; /* for async await transpile */

import '../styles/main.scss';

import '../styles/utility.scss';

import App from './app';

const app = new App({
    button: document.querySelector('#menu-toggle-container'),
    drawer: document.querySelector('.mobile-nav'),
    content: document.querySelector('#maincontent'),
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
});
