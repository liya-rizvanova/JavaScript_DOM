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
    <div class="card">
      <img src="${element.img}" alt="${element.title}" />
      <div class="description">
        <h2>${element.title}</h2>
        <p>${element.description}</p>
        <h3>$${element.price}</h3>
      </div>
    </div>
    `)
  });
});
