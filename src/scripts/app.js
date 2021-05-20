import DrawerInitiator from './DrawerInitiator';

import UrlParser from './routes/url-parser';

import routes from './routes';

class App {
    constructor({ button, drawer, content }) {
        this.button = button;
        this.drawer = drawer;
        this.content = content;
        this.initialAppShell();
    }

    initialAppShell() {
        const { button, drawer, content } = this;
        DrawerInitiator.init({
            button,
            drawer,
            content,
        });

        this.renderPage();
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url] || routes['/404'];
        page.init(this.content);
        this.content.innerHTML = `
            <div>
            ${await page.render()}
            </div>
        `;
        await page.afterRender();
    }
}

export default App;
