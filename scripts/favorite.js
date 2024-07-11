import sneakers from './products.json' with {type: 'json'};
let favContainer = document.querySelector('.product-container');

function getFavItems() {
    let favItems = JSON.parse(localStorage.getItem('favs')) || [];
    favItems.map((favItem) => {
        let search = sneakers.find((item) => item.id === favItem.id);
        let productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
                    <img src="${search.img}" alt="${search.name}">
                    <h3>${search.name}</h3>
                    <p>${search.category}</p>
                `;

        let priceBlock = document.createElement('div');
        priceBlock.classList.add('price-block');
        priceBlock.innerHTML = `<span class="price">$${search.price}</span>`;

        let qtyBlock = document.createElement('div');
        qtyBlock.classList.add('qty-block');
        qtyBlock.innerHTML = `<i class="fa-solid fa-square-minus" style="color: #000000;"></i>`;

        qtyBlock.addEventListener('click', () => {
            let favs = JSON.parse(localStorage.getItem('favs')) || [];
            let index = favs.findIndex((favsItem) => favsItem.id === favItem.id);
            if (index !== -1) {
                favs.splice(index, 1);
                localStorage.setItem('favs', JSON.stringify(favs));
                productCard.style.display = "none";
            }
        })

        priceBlock.appendChild(qtyBlock);
        productCard.appendChild(priceBlock);
        favContainer.appendChild(productCard);
    })
}

getFavItems();