import RestaurantFavouriteModel from '../repository/database/RestaurantFavouriteModel';
import Home from './home';

const Favorite = {
    ...Home,
    async render() {
        const restaurants = await RestaurantFavouriteModel.getAll();
        this.restaurans = restaurants;
        return `
        <section class="hero home-jumbotron with-default-bg" tabindex="0">
            <div class="hero-overlay">
                <div class="hero-content">
                    <div class="caption">
                        <span>Restoran Favorit</span>
                        <p>Menampilkan daftar restoran yang kamu sukai!
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <div class="container" id="content" tabindex="0">
            <h1 class="p-1 pt-3" tabindex="0">Restoran Favorit</h1>

            <div class="p-1">
                <div class="list-restaurant" id="list-restaurant"></div>
                <div id="list-restaurant-zero"></div>

            </div>
        </div>
    `;
    },
    notAvailableMessage() {
        return `
            <div class="flex justify-center p-3">
                <div class="block text-center">
                    <i class="fas fa-frown fa-3x block"></i>
                    <p class"mt-1">Daftar restoran favorite anda masih kosong.</p>
                </div>
            </div>
        `;
    },
};

export default Favorite;
