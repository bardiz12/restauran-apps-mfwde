import RestaurantData from '../repository/RestaurantData';

const Home = {
    container: null,
    selectListener: null,
    clickListener: null,
    init(container) {
        this.container = container;
    },
    async render() {
        return `
            <section class="hero home-jumbotron" tabindex="0">
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
            <div class="container">
                <h1 class="p-1 pt-3" tabindex="0">Explore Restaurant</h1>

                <div class="p-1">
                    <div class="filter-restaurant">
                        <div>
                            <label for="kota">Pilih Kota</label>
                            <select name="kota" id="kota">
                                
                            </select>
                        </div>
                    </div>
                    <div class="list-restaurant" id="list-restaurant"></div>

                </div>
            </div>
        `;
    },

    async afterRender() {
        const select = this.container.querySelector('select#kota');
        this.renderListRestaurant();
        if (this.selectListener === null) {
            this.selectListener = select.addEventListener('change', () => {
                const selectedCity = document.querySelector('select#kota').selectedOptions[0].value || null;
                window.cityFilter = selectedCity;
                this.renderListRestaurant();
            });
        }
        if (this.clickListener === null) {
            this.clickListener = document.addEventListener('click', (e) => {
                if (e.target.classList.contains('restaurant-save-button') >= 0) {
                    this.handleSaveButton(e.target);
                }
            });
        }
    },

    async handleSaveButton(button) {
        const span = button.querySelector('span.item');
        const isSaved = span.classList.contains('saved');
        const icon = span.querySelector('i');
        const text = span.querySelector('span');

        const toggledSave = !isSaved;
        span.classList.toggle('saved');
        if (toggledSave) {
            icon.classList.remove('fa-heart-o');
            icon.classList.add('fa-heart');

            text.innerHTML = 'saved';
        } else {
            icon.classList.add('fa-heart-o');
            icon.classList.remove('fa-heart');
            text.innerHTML = 'save';
        }
    },

    async renderListRestaurant() {
        const cityFilterKeyword = window.cityFilter || null;

        const { restaurants } = await RestaurantData.getListRestauran();
        const elm = this.container.querySelector('#list-restaurant');
        const cities = restaurants
            .map((item) => item.city)
            .filter((item, index, self) => self.indexOf(item) === index);

        const select = this.container.querySelector('select#kota');

        select.innerHTML = `<option>Semua Kota</option>${cities.map((item) => `
            <option ${item === cityFilterKeyword ? 'selected' : ''}>${item}</option>
        `)}`;

        elm.innerHTML = restaurants.map((restauran) => {
            if (cityFilterKeyword !== null && cityFilterKeyword !== 'Semua Kota' && restauran.city !== cityFilterKeyword) {
                return '';
            }
            return `
            <article class="item-restaurant" tabindex="0">
                <div class="head">
                    <span class="city" aria-label="Kota ${restauran.city}">${restauran.city}</span>
                    <img src="${restauran.pictureId}" alt="restoran ${restauran.name}">
                </div>
                <div class="body">
                    <span class="title">${restauran.name}</span>

                    <div class="ratings">
                        <div class="restaurant-stars">
                            ${'<i class="fa fa-star"></i>'.repeat(parseInt(restauran.rating, 10))}${restauran.rating / parseInt(restauran.rating, 10) > 1 ? '<i class="fa fa-star-half"></i>' : ''}
                        </div>
                        <span aria-label="Restoran ini memiliki rating sebanyak ${restauran.rating}">${restauran.rating.toFixed(1)}
                        </span>
                    </div>
                    <p>
                    ${restauran.description}
                    </p>

                </div>
                <div class="footer">
                    <div>
                        <button class="restaurant-save-button">
                            <span class="item ${restauran.isSaved ? 'saved' : ''}">
                                <i class="fa ${restauran.isSaved ? 'fa-heart' : 'fa-heart-o '}"></i>
                                <span>${restauran.isSaved ? 'Saved' : 'Save'}</span>
                            </span>
                        </button>
                    </div>
                    <div>
                    <a href="${`/#/detail/${restauran.id}`}" class="cta">
                        <span class="item">Detail <i class="fa fa-arrow-right"></i></span>
                    </a>
                    </div>
                </div>
            </article>
        `;
        }).join('\n');
    },
};

export default Home;
