import { renderAddPostPageComponent } from './add-post-page-component';
import { renderAuthPageComponent } from './auth-page-component';
import { fetchAndRenderPosts } from './fetch-and-render-posts';
import { goToPage, page, updateUser, user } from './goToPage';
import { saveUserToLocalStorage } from './helpers';
import { renderLoadingPageComponent } from './loading-page-component';
import { renderPostsPageComponent } from './posts-page-component';
import {
    ADD_POSTS_PAGE,
    AUTH_PAGE,
    LOADING_PAGE,
    POSTS_PAGE,
    USER_POSTS_PAGE,
} from './routes';
import { addPost } from './api';

export const renderApp = () => {
    const appEl = document.getElementById('app');
    if (page === LOADING_PAGE) {
        return renderLoadingPageComponent({
            appEl,
            user,
            goToPage,
        });
    }

    if (page === AUTH_PAGE) {
        return renderAuthPageComponent({
            appEl,
            setUser: (newUser) => {
                updateUser(newUser);
                saveUserToLocalStorage(newUser);
                goToPage(POSTS_PAGE);
            },
            user,
            goToPage,
        });
    }

    if (page === ADD_POSTS_PAGE) {
        return renderAddPostPageComponent({
            appEl,
            onAddPostClick({ description, imageUrl }) {
                return addPost({ description, imageUrl })
                    .then(() => {
                        return fetchAndRenderPosts();
                    })
                    .then(() => {
                        goToPage(POSTS_PAGE);
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            },
        });
    }

    if (page === POSTS_PAGE) {
        return renderPostsPageComponent({
            appEl,
        });
    }

    if (page === USER_POSTS_PAGE) {
        return renderPostsPageComponent({
            appEl,
        });
    }
};
