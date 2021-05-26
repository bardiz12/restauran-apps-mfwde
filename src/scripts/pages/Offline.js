const Offline = {
    container: null,
    init(container) {
        this.container = container;
    },
    async render() {
        return `
            <section class="hero with-default-bg" tabindex="0">
                <div class="hero-overlay">
                    <div class="hero-content">
                        <div class="caption">
                            <span>Kamu tidak terhubung ke internet.</span>
                            <p>
                                Untuk mengakses halaman ini kamu membutuhkan koneksi internet 
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

export default Offline;
