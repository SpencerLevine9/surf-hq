document.addEventListener('DOMContentLoaded', () => {
  const listingsContainer = document.getElementById('market-listings');

  const savedProducts = JSON.parse(localStorage.getItem('marketListings')) || [];

  savedProducts.forEach(product => {
  const card = document.createElement('div');
  card.className = 'col-md-4 mb-4 product-wrapper';
  card.innerHTML = `
    <div class="card product-card" data-type="${product.type}" data-price="${product.price}">
      <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">$${product.price} - ${product.description}</p>
        <p class="card-text"><strong>Contact:</strong> ${product.email}</p>
        <button class="btn btn-primary">Message Seller</button>
      </div>
    </div>
  `;
  listingsContainer.appendChild(card);
  });

});
