import CONFIG from '../globals/config';
import RestaurantFavouriteModel from '../repository/database/RestaurantFavouriteModel';
import RestaurantData from '../repository/RestaurantData';

const Home = {
    container: null,
    clickListener: null,
    restaurans: null,
    init(container) {
        this.container = container;
    },
    async render() {
        const { restaurants } = await RestaurantData.getListRestauran();
        this.restaurans = restaurants;
        return `
            <section class="hero home-jumbotron with-default-bg" tabindex="0">
                <div class="hero-overlay">
                    <div class="hero-content">
                        <div class="caption">
                            <span>Hari ini makan apa ya?</span>
                            <p>EatSkuy merupakan website katalog restauran yang pastinya akan cocok dengan selera lidah anda!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container" id="content" tabindex="0">
                <h1 class="p-1 pt-3" tabindex="0">Explore Restaurant</h1>

                <div class="p-1">
                    <div class="list-restaurant" id="list-restaurant"></div>
                    <div id="list-restaurant-zero"></div>

                </div>
            </div>
        `;
    },

    async afterRender() {
        this.renderListRestaurant();
    },

    async renderListRestaurant() {
        const cityFilterKeyword = window.cityFilter || null;

        const elm = this.container.querySelector('#list-restaurant');

        const restaurants = this.restaurans;

        if (restaurants.length === 0) {
            this.container.querySelector('#list-restaurant-zero').innerHTML = this.notAvailableMessage();
            return;
        }

        // eslint-disable-next-line max-len
        const saved = await RestaurantFavouriteModel.checkIsSaved(restaurants.map((item) => item.id));
        elm.innerHTML = restaurants.map((restauran) => {
            if (cityFilterKeyword !== null && cityFilterKeyword !== 'Semua Kota' && restauran.city !== cityFilterKeyword) {
                return '';
            }
            return `
            <article class="item-restaurant">
                <div class="head">
                    <span class="city" aria-label="Kota ${restauran.city}" tabindex="0">${restauran.city}</span>
                    <picture>
                        <source media="(max-width: 600px)" srcset="${CONFIG.BASE_IMAGE_URL.small}${restauran.pictureId}">
                        <img loading="lazy" tabindex="0" src="${CONFIG.BASE_IMAGE_URL.medium}${restauran.pictureId}" alt="restoran ${restauran.name}">
                    </picture>

                </div>
                <div class="body">
                    <span class="title"  tabindex="0">${restauran.name}</span>

                    <div class="ratings">
                        <div class="rating-item">
                            ${'<i class="fa fa-star"></i>'.repeat(parseInt(restauran.rating, 10))}${restauran.rating / parseInt(restauran.rating, 10) > 1 ? '<i class="fa fa-star-half"></i>' : ''}
                        </div>
                        <span  tabindex="0" aria-label="Restoran ini memiliki rating sebanyak ${restauran.rating}">${restauran.rating.toFixed(1)}
                        </span>
                    </div>
                    <p  tabindex="0">
                    ${restauran.description}
                    </p>

                </div>
                <div class="footer">
                    <div>
                        <fav-resto-button resto='${JSON.stringify(restauran)}' is-saved="${saved[restauran.id]}" resto-id="${restauran.id}" ></fav-resto-button>
                    </div>
                    <div>
                    <a href="${`/#/detail/${restauran.id}`}" class="cta">
                        <span class="clickable">Detail <i class="fa fa-arrow-right"></i></span>
                    </a>
                    </div>
                </div>
            </article>
        `;
        }).join('\n');
    },

    notAvailableMessage() {
        return `
            <p>Data belum tersediaAnda belum menyukai restoran manapun</p>
        `;
    },
};

export default Home;
