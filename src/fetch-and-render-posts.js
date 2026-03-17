import { updatePosts } from './main';
import { getPosts } from './api';
import { renderPostsPageComponent } from './posts-page-component';

export const fetchAndRenderPosts = () => {
  return getPosts().then((data) => {
    updatePosts(data.posts);
    renderPostsPageComponent();
  });
};
