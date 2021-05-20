const NotFound = {
    container: null,
    init(container) {
        this.container = container;
    },
    async render() {
        return `
            <section class="hero" tabindex="0">
                <div class="hero-overlay">
                    <div class="hero-content">
                        <div class="caption">
                            <span>Halaman Tidak Tersedia</span>
                            <p>
                                Sepertinya kamu tersesat
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },
    async afterRender() {
        return false;
    },
};

export default NotFound;
