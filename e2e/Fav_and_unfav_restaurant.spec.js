const assert = require('assert');

Feature('Fav and Unfave a restaurant');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty list of favourite restaurant', ({ I }) => {
    I.seeElement('#list-restaurant-zero');
    I.see('Daftar restoran favorite anda masih kosong.', 'p.no-resto-paragraph');
});

Scenario('save and unsave a restaurant', async ({ I }) => {
    I.amOnPage('/');

    I.seeElement('.item-restaurant');

    const firstRestoTitle = await I.grabTextFrom(locate('.item-restaurant .title').first());

    I.seeElement('fav-resto-button');
    I.click(locate('fav-resto-button').first());

    I.amOnPage('/#/favorite');

    I.seeElement('.item-restaurant');

    const firstLikedRestoTitle = await I.grabTextFrom(locate('.item-restaurant .title').first());

    assert.strictEqual(firstRestoTitle, firstRestoTitle);

    //Unsave
    I.click(locate('fav-resto-button').first());

    I.seeElement('[aria-label="Tambahkan ke daftar restoran favorit"]');
    I.refreshPage();
    I.seeElement('#list-restaurant-zero');
    I.see('Daftar restoran favorite anda masih kosong.', 'p.no-resto-paragraph');
});
