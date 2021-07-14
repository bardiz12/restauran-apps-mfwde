const assert = require('assert');

Feature('Reviewing restaurnt');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('send review to a restaurant', ({ I }) => {
    I.seeElement('.item-restaurant');
    I.click(locate('a.cta').first());

    const testComment = `e2e testing is ok! ${Math.random()}`;
    const testName = `Tes Review Bardiz ${Math.random()}`;
    I.seeElement('.form-review-container');
    I.fillField('#review_name', testName);
    I.fillField('#review_review', testComment);
    I.click('.form-review-container button');

    I.see(testComment);
    I.see(testName);
});
