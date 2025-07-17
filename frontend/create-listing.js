document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('listingForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const type = document.getElementById('type').value;
    const contact = document.getElementById('contact').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const imageBase64 = await toBase64(imageFile);

    const newListing = {
      id: Date.now(),
      title,
      description,
      price,
      type,
      contact,
      image: imageBase64
    };

    const existing = JSON.parse(localStorage.getItem('surfListings')) || [];
    existing.push(newListing);
    localStorage.setItem('surfListings', JSON.stringify(existing));

    alert("Listing posted successfully!");
    window.location.href = "market.html"; // ✅ Redirect to market after post
  });

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
});
