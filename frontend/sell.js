// sell.js
const LISTINGS_KEY = 'marketListings';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sell-form');
  const statusMessage = document.getElementById('statusMessage');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const listing = {
      id: Date.now(),
      title: document.getElementById('productName').value.trim(),
      description: document.getElementById('description').value.trim(),
      type: document.getElementById('type').value,        // BOARD/WETSUIT/ACCESSORY/OTHER
      condition: document.getElementById('condition')?.value || 'Any',
      price: parseFloat(document.getElementById('price').value),
      email: document.getElementById('email').value.trim(),
      imageUrl: document.getElementById('imageUrl').value.trim(),
      createdAt: new Date().toISOString()
    };

    const listings = JSON.parse(localStorage.getItem(LISTINGS_KEY)) || [];
    listings.push(listing);
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));

    statusMessage.textContent = 'Listing posted!';
    form.reset();
  });
});
