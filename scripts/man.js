import sneakers from './products.json' with {type: 'json'};
let productContainer = document.querySelector('.product-container');

function manCategory()
{
    sneakers.forEach((shoes)=>
    {
        if(shoes.category === "Men’s shoes")
        {
            let productCard = document.createElement('div');
        
            productCard.classList.add('product-card');
        
            productCard.innerHTML = `
              <img src="${shoes.img}" alt="${shoes.name}">
              <h3>${shoes.name}</h3>
              <p>${shoes.category}</p>
            `;
        
            let priceBlock = document.createElement('div');
            priceBlock.classList.add('price-block');
            priceBlock.innerHTML = `
              <span class="price">$${shoes.price}</span>
              <button class="add-to__cart">Add to Cart</button>
            `;
        
            productCard.appendChild(priceBlock);
            productContainer.appendChild(productCard);
        }
    })
}
manCategory();