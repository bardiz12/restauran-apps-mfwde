import FavRestoButton from '../src/scripts/components/FavRestoButton';
import RestaurantFavouriteModel from '../src/scripts/repository/database/RestaurantFavouriteModel';

const resto = {
    id: 'uqzwm2m981kfw1e867',
    name: 'Bobby',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.',
    pictureId: '19',
    city: 'Ternate',
    rating: 4.7,
};

window.customElements.define('fav-resto-button', FavRestoButton);
describe('adding a restaurant to favorite, ',
    () => {

        document.body.innerHTML = `
                <fav-resto-button resto='${JSON.stringify(resto)}'></fav-resto-button>
            `;

        it('fav button should show save when the restaurant has not been favorited before', async () => {
            expect(
                document.querySelector('[aria-label="Tambahkan ke daftar restoran favorit"]'),
            ).toBeTruthy();
        });

        it('fav button should show saved when the restaurant has been favorited before', async () => {
            expect(
                document.querySelector('[aria-label="Keluarkan dari daftar restoran favorit"]'),
            ).toBeFalsy();
        });

        it('should be able to fav the restaurant', async () => {
            document.querySelector('fav-resto-button').dispatchEvent(new Event('click'));

            const restos = (await RestaurantFavouriteModel.getAll()).map((item) => item.id);
            expect(
                restos.indexOf(resto.id) >= 0,
            ).toBeTruthy();
            await RestaurantFavouriteModel.remove(resto.id);
        });

        it('should be able to unfav the restaurant', async () => {
            document.querySelector('fav-resto-button').dispatchEvent(new Event('click'));

            const restos = (await RestaurantFavouriteModel.getAll()).map((item) => item.id);
            expect(
                restos.indexOf(resto.id) === -1,
            ).toBeTruthy();
        });
    });
