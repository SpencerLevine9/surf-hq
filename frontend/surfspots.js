document.addEventListener('DOMContentLoaded', () => {
    
  // Create a map in the "map" div, set the view to a given place/zoom
  const map = L.map('map').setView([34.007, -118.499], 10);
  // L.map('map') looks for <div id="map"></div> in your HTML

  // Add OpenStreetMap tiles (Leaflet’s default)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // mock surf spots data for now 
  const mockSurfSpots = [
    {
      name: "Malibu",
      latitude: 34.033,
      longitude: -118.678,
      avgWaveHeight: '3-5 ft',
      description: 'A popular surf spot with consistent waves.'
      ,reviews: [
      "Perfect for mellow longboarding sessions.",
      "Gets crowded on weekends, but worth it."
    ]

    },
    {
      name: "Huntington Beach",
      latitude: 33.659,
      longitude: -118.001,
      avgWaveHeight: '4-6 ft',
      description: 'Known as Surf City, USA.'
      ,reviews: [
      "Consistent waves, great atmosphere.",
      "Excellent for intermediate surfers!"
    ]
    },
    {
      name: "Santa Monica",
      latitude: 34.019,
      longitude: -118.491,
      avgWaveHeight: '2-4 ft',
      description: 'Great for beginners and longboarders.'
      ,reviews: [
      "Gentle waves, really welcoming vibe.",
      "Love the early morning surf here!"
    ]
    }
  ];

  function loadSurfSpots() {
     mockSurfSpots.forEach(spot => {
      L.marker([spot.latitude, spot.longitude])
        .addTo(map)
        .bindPopup(`<strong>${spot.name}</strong><br>Avg Wave: ${spot.avgWaveHeight}<br>${spot.description}`);

    // Create a list item for each surf spot
    const spotElement = document.createElement('li');
    spotElement.className = 'list-group-item mb-3';
    spotElement.innerHTML = `
      <h5>${spot.name}</h5>
      <p><strong>Average Wave Height:</strong> ${spot.avgWaveHeight}</p>
      <p>${spot.description}</p>
      <strong>Reviews:</strong>
      <ul>
        ${spot.reviews.map(review => `<li>${review}</li>`).join('')}
      </ul>
    `;
    document.getElementById('surf-spot-list').appendChild(spotElement);

    });
  }

  // 🚀 Load the markers on page load
  loadSurfSpots();


function handleRecommendation(event) {
  event.preventDefault(); // Prevents form reload

  const experience = document.getElementById("experience").value;
  const wavePref = document.getElementById("waveHeight").value;

  console.log("Experience:", experience, "Wave Height:", wavePref);
  
  const recommendation = mockSurfSpots.find(spot =>
    spot.avgWaveHeight === wavePref // You can improve logic to consider experience too
  );

  const message = recommendation
    ? `We recommend: ${recommendation.name} — ${recommendation.description}`
    : "No matching surf spot found.";

  document.getElementById("recommendation").innerText = message;

  if (recommendation) {
  map.setView([recommendation.latitude, recommendation.longitude], 12, {
    animate: true
  });
}

}

  window.handleRecommendation = handleRecommendation;

});