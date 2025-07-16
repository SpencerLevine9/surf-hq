document.addEventListener('DOMContentLoaded', () => {

const posts = [];

function submitPost() {
  const input = document.getElementById('postText');
  const content = input.value.trim();
  if (content) {
    posts.unshift(content);
    input.value = '';
    renderPosts();
  }
}

function renderPosts() {
  const postList = document.getElementById('postList');
  postList.innerHTML = '';

  posts.forEach((post, index) => {
    const card = document.createElement('div');
    card.className = 'card mb-2';
    card.innerHTML = `
      <div class="card-body">
        <p class="card-text">${post}</p>
        <small class="text-muted">Just now</small>
      </div>
    `;
    postList.appendChild(card);
  });
}

});