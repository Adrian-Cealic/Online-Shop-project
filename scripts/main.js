import sneakers from './products.json' with {type: 'json'};
let productContainer = document.querySelector('.product-container');


function createShop() {
    sneakers.forEach((shoes) => {
      let productCard = document.createElement('div');
      productCard.classList.add('product-card');  
      productCard.innerHTML = `
        <img src="${shoes.img}" alt="${shoes.name}">
        <h3>${shoes.name}</h3>
        <p>${shoes.category}</p>
      `;

      let productFav = document.createElement('img');
      productFav.classList.add('fav');
      let favs = JSON.parse(localStorage.getItem('favs')) || [];
      let searchFav = favs.find((favsItem) => favsItem.id === shoes.id);
      productFav.src = "../img/likedIMG/whiteHeart.svg";
      if(searchFav !== undefined)
      {
        productFav.classList.add('fav-on');
      }
      productFav.addEventListener('click',()=>{
          addToFav(shoes.id);
          productFav.classList.toggle('fav-on');
      });
  
      let priceBlock = document.createElement('div');
      priceBlock.classList.add('price-block');
      priceBlock.innerHTML = `
        <span class="price">$${shoes.price}</span>
        <button class="add-to__cart">Add to Cart</button>
      `;
  
      priceBlock.querySelector(".add-to__cart").addEventListener('click', () => {
        addToCart(shoes.id);
      });
  
      productCard.appendChild(priceBlock);
      productCard.appendChild(productFav);
      productContainer.appendChild(productCard);
    });
  };
  
createShop();

let totalProductsParagraph = document.querySelector('.total-products');
totalProductsParagraph.textContent = `${sneakers.length} Products`;

let cart =JSON.parse(localStorage.getItem('cart')) || [];
//setam array curat initial caci nu trebuie sa avem valoare null,noi o sa salvam elementele in array,si array-ul in local storage
let addToCart = (id) =>
{
   let search = cart.find((cartItem)=>cartItem.id === id);
   if(search === undefined) //deoarece find() returneaza undefined sau number
   {
        cart.push({
            id: id,
            qty :1
        })
   }else{
    search.qty +=1;
   }
   localStorage.setItem('cart',JSON.stringify(cart));
}

let searchInput = document.querySelector('.search-input');
let search = document.querySelector('.search');
search.addEventListener('click',()=>
{
   if(searchInput.style.display === "none")
   {
    searchInput.style.display = "block";
   }
   else{
    searchInput.style.display = "none";
   }
});

function findShoe() {
  const searchText = searchInput.value.trim().toLowerCase();
  productContainer.innerHTML = "";
  let found = false;

  sneakers.forEach(shoe => {
      if (JSON.stringify(shoe.name).toLowerCase().includes(searchText)) {
          found = true;

          let productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.innerHTML = `
              <img src="${shoe.img}" alt="${shoe.name}">
              <h3>${shoe.name}</h3>
              <p>${shoe.category}</p>
              <span class="price">$${shoe.price}</span>
          `;

          let productFav = document.createElement('img');
          productFav.classList.add('fav');
          let favs = JSON.parse(localStorage.getItem('favs')) || [];
          let searchFav = favs.find((favsItem) => favsItem.id === shoe.id);
          productFav.src = "../img/likedIMG/whiteHeart.svg";
          if(searchFav !== undefined)
          {
            productFav.classList.add('fav-on');
          }
          productFav.addEventListener('click',()=>{
              addToFav(shoe.id);
              productFav.classList.toggle('fav-on');
          });

          let priceBlock = document.createElement('div');
          priceBlock.classList.add('price-block');
          priceBlock.innerHTML = `
              <span class="price">$${shoe.price}</span>
              <button class="add-to__cart">Add to Cart</button>
          `;

          priceBlock.querySelector(".add-to__cart").addEventListener('click', () => {
              addToCart(shoe.id);
          });

          productCard.appendChild(productFav);
          productCard.appendChild(priceBlock);
          productContainer.appendChild(productCard);
      }
  });

  productCard.style.display = found ? "block" : "none";
};

searchInput.addEventListener('input', findShoe);

let favs = JSON.parse(localStorage.getItem('favs')) || [];
let addToFav = (id) => {
  let search = favs.find((favsItem) => favsItem.id === id);
  if (search === undefined) {
      favs.push({
      id: id,
      fav: 1
    });

  } else if (search.fav === 1){
      let index = favs.findIndex((favsItem) => favsItem.id === id);
      if (index !== -1) {
          favs.splice(index, 1);
      }
  }
 
  localStorage.setItem('favs', JSON.stringify(favs));
}





