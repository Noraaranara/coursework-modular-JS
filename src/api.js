import { user } from './goToPage.js';

const personalKey = 'nora-solntse';
export const baseHost = 'https://wedev-api.sky.pro';
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export const getToken = () => {
    let token = user ? `Bearer ${user.token}` : undefined;

    return token;
};

// гет постов, принимает токен и возвращает массив постов
export function getPosts() {
    return fetch(postsHost, {
        method: 'GET',
        headers: {
            Authorization: getToken(),
        },
    }).then((response) => {
        if (response.status === 401) {
            throw new Error('Нет авторизации');
        }

        return response.json();
    });
}

export function getUserPosts({ id }) {
    return fetch(postsHost + '/user-posts/' + id, {
        method: 'GET',
        headers: {
            Authorization: getToken(),
        },
    }).then((response) => {
        if (response.status === 401) {
            throw new Error('Нет авторизации');
        }

        return response.json();
    });
}

export function likePost({ id }) {
    return fetch(postsHost + '/' + id + '/like', {
        method: 'POST',
        headers: {
            Authorization: getToken(),
        },
    }).then((response) => response.json());
}

export function dislikePost({ id }) {
    return fetch(postsHost + '/' + id + '/dislike', {
        method: 'POST',
        headers: {
            Authorization: getToken(),
        },
    }).then((response) => response.json());
}

// добавляет пост, принимает токен, описание и url картинки, возвращает добавленный пост
export function addPost({ description, imageUrl }) {
    return fetch(postsHost, {
        method: 'POST',
        headers: {
            Authorization: getToken(),
            contentType: 'application/json',
        },
        body: JSON.stringify({
            description,
            imageUrl,
        }),
    }).then((response) => {
        if (response.status === 401) {
            throw new Error('Нет авторизации');
        }

        return response.json();
    });
}

// регистрирует пользователя, принимает логин, пароль, имя и url картинки, возвращает токен
export function registerUser({ login, password, name, imageUrl }) {
    return fetch(baseHost + '/api/user', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
            name,
            imageUrl,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Такой пользователь уже существует');
        }
        return response.json();
    });
}

// заходит в аккаунт пользователя, принимает логин, пароль, возвращает токен
export function loginUser({ login, password }) {
    return fetch(baseHost + '/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Неверный логин или пароль');
        }
        return response.json();
    });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
    const data = new FormData();
    data.append('file', file);

    return fetch(baseHost + '/api/upload/image', {
        method: 'POST',
        body: data,
    }).then((response) => {
        return response.json();
    });
}
