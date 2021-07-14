const DrawerInitiator = {

    init({ button, drawer, content }) {
        this.button = button;
        this.drawer = drawer;
        this.content = content;
        button.addEventListener('click', (event) => this.toggleDrawer(event));
        this.drawer.addEventListener('click', (event) => {
            if (event.target.nodeName === 'A') {
                this.hideDrawer();
            }
        });
    },

    toggleDrawer() {
        const toggler = this.button.querySelector('span');
        toggler.classList.toggle('active');
        this.drawer.classList.toggle('mobile-nav-active');
        this.content.classList.toggle('disable-scroll');
    },

    hideDrawer() {
        const toggler = this.button.querySelector('span');
        toggler.classList.remove('active');
        this.drawer.classList.remove('mobile-nav-active');
        this.content.classList.remove('disable-scroll');
    },
};

export default DrawerInitiator;
