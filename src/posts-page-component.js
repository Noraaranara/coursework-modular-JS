import { USER_POSTS_PAGE } from './routes.js';
import { renderHeaderComponent } from './header-component.js';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { ru } from 'date-fns/locale/ru';
import { goToPage, posts } from './goToPage.js';
import likeActive from './assets/images/like-active.svg';
import likeNotActive from './assets/images/like-not-active.svg';
import { dislikePost, likePost } from './api.js';
import { fetchAndRenderPosts } from './fetch-and-render-posts.js';

// рендер страницы с постами
export function renderPostsPageComponent() {
    const appEl = document.getElementById('app');

    appEl.innerHTML = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts">
  ${posts
      .map((post) => {
          const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: ru,
          });
          return `
            <li data-index="${post.id}" class="post">
              <div class="post-header" data-user-id="${post.user.id}">
                  <img src="${post.user.imageUrl}" class="post-header__user-image">
                  <p class="post-header__user-name">${post.user.name}</p>
              </div>
              <div class="post-image-container">
                <img class="post-image" src="${post.imageUrl}">
              </div>
              <div class="post-likes">
                <button data-post-id="${post.id}" class="like-button">
                  <img src="${post.isLiked ? likeActive : likeNotActive}">
                </button>
                <p class="post-likes-text">
                  Нравится: <strong>${post.likes.length}</strong>
                </p>
              </div>
              <p class="post-text">
                <span class="user-name">${post.user.name}</span>
                ${post.description}
              </p>
              <p class="post-date">
                ${timeAgo}
              </p>
            </li>`;
      })
      .join('')}
    </ul>
  </div>
  `;

    renderHeaderComponent({
        element: document.querySelector('.header-container'),
    });

    for (let userEl of document.querySelectorAll('.post-header')) {
        userEl.addEventListener('click', () => {
            goToPage(USER_POSTS_PAGE, {
                userId: userEl.dataset.userId,
            });
        });
    }

    document.querySelector('.posts').addEventListener('click', (event) => {
        const likeBtn = event.target.closest('.like-button');

        if (!likeBtn) return;

        const postId = likeBtn.dataset.postId;

        const post = posts.find((p) => String(p.id) === String(postId));
        if (!post) return;

        const request = post.isLiked
            ? dislikePost({ id: postId })
            : likePost({ id: postId });

        request
            .then(() => fetchAndRenderPosts())
            .catch((err) => console.error(err));
    });
}
