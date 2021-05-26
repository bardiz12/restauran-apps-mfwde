import 'regenerator-runtime'; /* for async await transpile */

import '../styles/main.scss';

import App from './app';

const app = new App({
    button: document.querySelector('#menu-toggle-container'),
    drawer: document.querySelector('.mobile-nav'),
    content: document.querySelector('#maincontent'),
});
window.app = app;
window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('SW registered: ', registration);
        }).catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
