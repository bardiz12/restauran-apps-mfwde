const getListRestaurant = async () => {
    return await (await fetch('./data.json')).json()
}

const sumarizeText = (text, limit = null) => {
    if (text.length <= 0) return ''

    limit = limit ? limit : 150;
    
    if(text.length <= limit ) return text

    return text.substring(0, limit)
               .replace(/\s+$/, "")
               + "..."
}

const renderListRestaurant = async (elementId) => {
    if("cityFilter" in window === false){
        window.cityFilter = null
    }
    const data = "cacheResto" in window ? window.cacheResto : await getListRestaurant()
    const { restaurants } = data

    if (restaurants === undefined) {
        return alert('gagal meload Data')
    }

    const elm = document.querySelector(elementId)
    const cities = restaurants.map(item => item.city)
                                .filter((item, index, self) => self.indexOf(item) === index)

    const select = document.querySelector("select#kota")
    select.innerHTML = '<option>Semua Kota</option>' + cities.map(item => {
        return `
            <option ${item === window.cityFilter ? 'selected' : ''}>${item}</option>
        `
    })
    
    elm.innerHTML = restaurants.map(restauran => {
        if(window.cityFilter !== null && window.cityFilter !== 'Semua Kota' && restauran.city !== window.cityFilter){
            return ''
        }
        return `
            <article class="item-restaurant" tabindex="0">
                <div class="head">
                    <span class="city" aria-label="Kota ${restauran.city}">${restauran.city}</span>
                    <img src="${restauran.pictureId}" alt="Gambar restoran ${restauran.name}">
                </div>
                <div class="body">
                    <span class="title">${restauran.name}</span>
                
                    
                    <div class="ratings">
                        <div class="restaurant-stars">
                            ${`<i class="fa fa-star"></i>`.repeat(parseInt(restauran.rating))}${restauran.rating / parseInt(restauran.rating) > 1 ? '<i class="fa fa-star-half"></i>' : ''}
                        </div>
                        <span aria-label="Restoran ini memiliki rating sebanyak ${restauran.rating}">${restauran.rating.toFixed(1)}
                        </span>
                    </div>
                    <p>
                    ${sumarizeText(restauran.description)}
                    </p>
                </div>
            </article>
        `
    }).join("\n")
}

module.exports = {
    renderListRestaurant
}