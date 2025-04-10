const url = './data.json';

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

document.addEventListener('DOMContentLoaded', async (e) => {
  const data = await getData(url);
  const list = document.querySelector('.cards');

  data.forEach(element => {
    list.insertAdjacentHTML('beforeend', `
      <div class="card" data-id="${element.id}">
        <img src="${element.img}" alt="${element.title}" />
        <div class="description">
          <h2>${element.title}</h2>
          <p>${element.description}</p>
          <h3>$${element.price}</h3>
          <button class="add-to-cart">Add to cart</button>
        </div>
      </div>
    `);
  });

  // Обработчик нажатия на кнопку добавления в корзину
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      const product = data.find(item => item.id == id);
      addToCart(product);
    });
  });
});

// Добавление товара в корзину
function addToCart(product) {
  const cart = document.querySelector('.cart-items');
  if (cart) {
    cart.insertAdjacentHTML('beforeend', `
      <li>
        ${product.title} - $${product.price}
        <button class="remove-from-cart">X</button>
      </li>
    `);
  }
}

// Удаление из корзины
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-from-cart')) {
    e.target.closest('li').remove();
  }
});
