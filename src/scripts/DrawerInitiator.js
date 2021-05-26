const DrawerInitiator = {

    init({ button, drawer, content }) {
        this.button = button;
        this.drawer = drawer;
        this.content = content;
        button.addEventListener('click', (event) => this.toggleDrawer(event));
    },

    toggleDrawer() {
        const toggler = this.button.querySelector('span');
        toggler.classList.toggle('active');
        this.drawer.classList.toggle('mobile-nav-active');
        this.content.classList.toggle('disable-scroll');
    },
};

export default DrawerInitiator;
