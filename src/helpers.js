import { baseHost } from './api';

export function saveUserToLocalStorage(user) {
    window.localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
    try {
        return JSON.parse(window.localStorage.getItem('user'));
    } catch (error) {
        return null;
    }
}

export function removeUserFromLocalStorage(user) {
    window.localStorage.removeItem('user');
}

export function uploadImage({ file }) {
    const data = new FormData();
    data.append('file', file);

    return fetch(baseHost + '/api/upload/image', {
        method: 'POST',
        body: data,
    })
        .then((response) => {
            response.json();
        })
        .then((data) => {
            return data.fileUrl;
        });
}
