import './style.css';

import { fetchAndRenderPosts } from './fetch-and-render-posts.js';
import { goToPage } from './goToPage.js';
import { POSTS_PAGE } from './routes.js';

fetchAndRenderPosts();

goToPage(POSTS_PAGE);
