document.addEventListener('DOMContentLoaded', () => {

function applyFilters() {
  const wrappers = document.querySelectorAll('.product-wrapper');

  wrappers.forEach(wrapper => {
    const card = wrapper.querySelector('.product-card');
    const type = card.getAttribute('data-type');
    const price = parseInt(card.getAttribute('data-price'));

    const matchesType = (filters.type === 'All' || filters.type === type);
    const matchesPrice = (filters.price === 'Any' || (
      filters.price === '<50' && price < 50 ||
      filters.price === '50-200' && price >= 50 && price <= 200 ||
      filters.price === '>200' && price > 200
    ));

    wrapper.style.display = (matchesType && matchesPrice) ? 'block' : 'none';
  });
}


  document.getElementById('gearType').addEventListener('change', e => {
    filters.type = e.target.value;
    applyFilters();
  });

  document.getElementById('priceRange').addEventListener('change', e => {
    filters.price = e.target.value;
    applyFilters();
  });

});