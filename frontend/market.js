// market.js
const LISTINGS_KEY = 'marketListings';
const LEGACY_KEYS = ['marketProducts']; // old key(s)

const listingsContainer = document.getElementById('market-listings');
const gearTypeFilter = document.getElementById('gearType'); // matches your HTML
const priceRangeFilter = document.getElementById('priceRange'); // matches your HTML

init();

function init() {
  migrateLegacy();
  const listings = getListings();
  render(listings);

  gearTypeFilter?.addEventListener('change', applyFilters);
  priceRangeFilter?.addEventListener('change', applyFilters);
}

function migrateLegacy() {
  for (const key of LEGACY_KEYS) {
    const legacy = JSON.parse(localStorage.getItem(key) || 'null');
    if (legacy && Array.isArray(legacy) && legacy.length) {
      const current = JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
      const merged = dedupeById([...current, ...legacy]);
      localStorage.setItem(LISTINGS_KEY, JSON.stringify(merged));
      localStorage.removeItem(key);
    }
  }
}

function getListings() {
  return JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
}

function applyFilters() {
  const gearType = gearTypeFilter?.value || 'All';
  const priceRange = priceRangeFilter?.value || 'Any';

  let data = getListings();

  // Filter by gear type
  if (gearType !== 'All') {
    data = data.filter(x => x.type === gearType);
  }

  // Filter by price range
  if (priceRange !== 'Any') {
    data = data.filter(x => {
      const price = Number(x.price);
      if (priceRange === '<50') return price < 50;
      if (priceRange === '50-200') return price >= 50 && price <= 200;
      if (priceRange === '>200') return price > 200;
      return true;
    });
  }

  render(data);
}

function render(listings) {
  if (!listingsContainer) return;
  listingsContainer.innerHTML = '';

  if (!listings.length) {
    listingsContainer.innerHTML = `<p class="text-muted">No listings yet. Be the first to post!</p>`;
    return;
  }

  listings
    .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach(l => listingsContainer.appendChild(card(l)));
}

function card(l) {
  const div = document.createElement('div');
  div.className = 'col-md-4 mb-4';
  div.innerHTML = `
    <div class="card shadow-sm h-100">
      <img src="${l.imageUrl || ''}" class="card-img-top" alt="${escapeHtml(l.title)}"
           onerror="this.src='https://via.placeholder.com/400x300?text=Surf+Gear';">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${escapeHtml(l.title)}</h5>
        <p class="badge bg-secondary mb-2">${l.type}</p>
        <p class="card-text">${escapeHtml(l.description || '')}</p>
        <strong class="mt-auto">$${Number(l.price).toFixed(2)}</strong>
        <a href="mailto:${encodeURIComponent(l.email)}" class="btn btn-primary btn-sm mt-2">Contact Seller</a>
        <small class="text-muted mt-1">Posted ${new Date(l.createdAt).toLocaleString()}</small>
      </div>
    </div>`;
  return div;
}

function dedupeById(arr) {
  const seen = new Set();
  return arr.filter(x => (x.id ? (seen.has(x.id) ? false : (seen.add(x.id), true)) : true));
}

function escapeHtml(s='') {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
