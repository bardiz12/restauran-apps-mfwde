const Utility = {
    showLoadingOverlay() {
        document.querySelector('#page-loader').classList.remove('page-loader-hidden');
        return this;
    },
    hideLoadingOverLay() {
        document.querySelector('#page-loader').classList.add('page-loader-hidden');
        return this;
    },
    setMessage(text) {
        document.querySelector('#page-loader span').innerHTML = text;
        return this;
    },
    defaultMessage() {
        document.querySelector('#page-loader span').innerHTML = 'Mohon Tunggu Sedang Memuat Halaman';
        return this;
    },
};

export default Utility;
