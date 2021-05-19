import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/utility.scss';
const app = require('./app')

console.log('Hello Coders! :)');

window.app = app;
window.addEventListener('DOMContentLoaded', () => {

    document.querySelector("#page-loader").remove();
    const menuToggle = document.querySelector("#menu-toggle-container");
    const nav = document.querySelector("#nav");
    const mobileNav = document.querySelector(".mobile-nav")

    const menuToggler = () => {
        const toggler = menuToggle.querySelector("span")

        toggler.classList.contains('active') 
            ? toggler.classList.remove('active') 
                || nav.classList.remove('navbar-list-mobile')
                || mobileNav.classList.remove('mobile-nav-active')
            : toggler.classList.add('active') 
                || nav.classList.add('navbar-list-mobile')
                || mobileNav.classList.add('mobile-nav-active')
        
    }

    menuToggle.addEventListener('click', menuToggler)

    mobileNav.addEventListener('click',
        e => e.target !== undefined 
            && e.target.classList.contains('mobile-nav-link') 
            && menuToggler()
    )

    app.renderListRestaurant('#list-restaurant')

    const select = document.querySelector("select#kota")

    select.addEventListener("change", function() {
        const selectedCity = document.querySelector("select#kota").selectedOptions[0].value || null
        window.cityFilter = selectedCity;
        app.renderListRestaurant('#list-restaurant')
    })

})