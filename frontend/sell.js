document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sell-form');
  const statusMessage = document.getElementById('statusMessage');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const product = {
      name: document.getElementById('productName').value,
      description: document.getElementById('description').value,
      type: document.getElementById('type').value,
      price: parseFloat(document.getElementById('price').value),
      email: document.getElementById('email').value,
      imageUrl: document.getElementById('imageUrl').value
    };

    // Load existing listings or initialize new array
    const listings = JSON.parse(localStorage.getItem('marketListings')) || [];
    listings.push(product);
    localStorage.setItem('marketListings', JSON.stringify(listings));

    statusMessage.textContent = "Product listed successfully!";
    form.reset();
  });
});
