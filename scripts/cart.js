document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-items'); 
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Корзина пуста</p>';
  } else {
      cart.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.innerHTML = `
             <p>${item.name} — ${item.price}$ (Кол-во: ${item.quantity})</p>
          `;
          cartContainer.appendChild(itemElement);
      });
  }
});
// document.addEventListener('DOMContentLoaded', () => {
//     const cartContainer = document.getElementById('cart-items'); 
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
//     if (cart.length === 0) {
//         cartContainer.innerHTML = '<p>Корзина пуста</p>';
//     } else {
//         cart.forEach(item => {
//             const itemElement = document.createElement('div');
//             itemElement.innerHTML = `
//                 <img src=${item.image}> <p>${item.name} — ${item.price}$ (Кол-во: ${item.quantity})</p>
//             `;
//             cartContainer.appendChild(itemElement);
//         });
//     }
//   });
  
