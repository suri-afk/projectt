
const myCarouselElement = document.querySelector('#myCarousel');
const cardElement = document.querySelector('.kaaa');

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
});

document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.buy-btn');

  buyButtons.forEach(button => {
      button.addEventListener('click', () => {
          const name = button.getAttribute('data-name');
          const price = button.getAttribute('data-price');
          const image = button.getAttribute('data-image');
          
          const product = {
              name: name,
              price: price,
              image: image,
              quantity: 1
          };

          addToCart(product);
      });
  });
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buy-btn');
  
    buttons.forEach(btn => {
        btn.onclick = function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);     
            let cart = JSON.parse(localStorage.getItem('myCart')) || [];
            const itemIndex = cart.findIndex(item => item.name === name);     
            if (itemIndex > -1) {
                cart[itemIndex].count += 1;
            } else {
                cart.push({ name, price, count: 1 });
            }
            localStorage.setItem('myCart', JSON.stringify(cart));
            alert('Товар добавлен!');
        };
    });
  });
  function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(item => item.name === product.name);

      if (existingProduct && existingProduct.quantity>1) {
          existingProduct.quantity += 1;
          cardElement.style.addClassName = "active";
      } else {
          cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      
      alert('Товар добавлен в корзину!');
  }
});

function removeFromCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.name === product.name);

  if (existingProduct && existingProduct.quantity>1) {
      existingProduct.quantity -= 1;
  } else {
      cart.push(product);
  }
 
  
  alert('Товар удален из корзины!');
}

