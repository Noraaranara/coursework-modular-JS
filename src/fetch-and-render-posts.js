import { updatePosts, user } from './goToPage.js';
import { getPosts } from './api';
import { renderPostsPageComponent } from './posts-page-component';

export const fetchAndRenderPosts = () => {
    return getPosts({
        token: user?.token,
    }).then((data) => {
        updatePosts(data.posts);
        renderPostsPageComponent();
    });
};
