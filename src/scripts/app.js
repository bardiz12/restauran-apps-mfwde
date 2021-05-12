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
    const { restaurants } = await getListRestaurant()
    if (restaurants === undefined) {
        return alert('gagal meload Data')
    }

    const elm = document.querySelector(elementId)
    elm.innerHTML = restaurants.map(restauran => {
        return `
            <article class="item-restaurant" tabindex="0">
                <img src="${restauran.pictureId}" alt="Gambar restoran ${restauran.name}">
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