import sneakers from './products.json' with {type: 'json'};
let cartContainer = document.querySelector('.cart-container');

function getCartItem() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.forEach((cartItem) => {
        let search = sneakers.find((item) => item.id === cartItem.id);

        let productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${search.img}" alt="${search.name}">
            <h3>${search.name}</h3>
        `;

        let priceBlock = document.createElement('div');
        priceBlock.classList.add('price-block');
        priceBlock.innerHTML = `
            <span class="price">$${search.price}</span>
        `;

        let qtyBlock = document.createElement('div');
        qtyBlock.classList.add('qty-block');
        qtyBlock.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            <p>${cartItem.qty}</p>
            <i class="fa-solid fa-minus"></i>
        `;
        priceBlock.appendChild(qtyBlock);
        productCard.appendChild(priceBlock);
        cartContainer.appendChild(productCard);

        let plus = productCard.querySelector('.fa-plus');
        let minus = productCard.querySelector('.fa-minus');

        plus.addEventListener('click', () => {
            cartItem.qty++;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            qtyBlock.querySelector('p').textContent = cartItem.qty;
        });

        minus.addEventListener('click', () => {
            if (cartItem.qty > 1) {
                cartItem.qty--;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                qtyBlock.querySelector('p').textContent = cartItem.qty;
            }
            else
            {
                let index = cartItems.findIndex(item => item.id === cartItem.id);
                if(index != -1)
                {
                    cartItems.splice(index,1);
                    localStorage.setItem('cart',JSON.stringify(cartItems));
                    productCard.remove();
                }
            }
        });
    });
}
getCartItem();