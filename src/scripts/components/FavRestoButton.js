import RestaurantFavouriteModel from '../repository/database/RestaurantFavouriteModel';

class FavRestoButton extends HTMLElement {
    connectedCallback() {
        this.isTransparent = JSON.parse(this.getAttribute('is-transparent') || false);
        this.resto = JSON.parse(this.getAttribute('resto') || null);
        this.isSaved = false;

        RestaurantFavouriteModel
            .checkIsSaved(this.resto.id)
            .then((isSaved) => {
                this.isSaved = isSaved[this.resto.id] || false;
            });

        // const checkIfSaved = (await (RestaurantFavouriteModel.checkIsSaved(this.resto.id)));

        // this.isSaved = checkIfSaved[this.resto.id] || false;
        this.render();
        this.initListener();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.render();
    }

    static get observedAttributes() {
        return ['is-saved'];
    }

    render() {
        this.innerHTML = `
            <button class="restaurant-save-button" aria-label="${!this.isSaved ? 'Tambahkan ke' : 'Keluarkan dari'} daftar restoran favorit">
                <span class="${this.isTransparent ? 'rounded bg-white px-2 py-2' : ''} clickable ${this.isSaved ? 'clickable-active' : ''}">
                    <i class="fa ${this.isSaved ? 'fa-heart' : 'fa-heart-o '}"></i>
                    <span>${this.isSaved ? 'Saved' : 'Save'}</span>
                </span>
            </button>
        `;
    }

    initListener() {
        this.addEventListener('click', async () => {
            this.isSaved = !this.isSaved;
            if (this.isSaved) {
                RestaurantFavouriteModel.add(this.resto);
            } else {
                RestaurantFavouriteModel.remove(this.resto.id);
            }
            this.render();
        });
    }
}

export default FavRestoButton;
