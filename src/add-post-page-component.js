import { getToken } from './api.js';
import { uploadImage } from './api.js';

// рендер страницы добавления поста
export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    const render = () => {
        const appHtml = `
    <div class="page-container">
        <div class="form">
            <div class="header-container">
                <h1 class="form-title">Добавить пост</h1>
            </div>
            <div class="form-inputs">
            <textarea class="post-description textarea" placeholder="Описание картинки"></textarea>
            <input type="file" class="post-image" placeholder="URL картинки" accept="image/*">
            <button class="button" id="add-button">Добавить</button>
            </div>
        </div>
    </div>
    `;

        appEl.innerHTML = appHtml;

        const descriptionInput = document.querySelector('.post-description');
        const imageInput = document.querySelector('.post-image');
        const addBtn = document.querySelector('#add-button');

        addBtn.onclick = async () => {
            const description = descriptionInput.value;
            const imageUrl = imageInput.files[0];
            const resImg = await uploadImage({ file: imageUrl });

            if (!description || !imageUrl) {
                alert('Пожалуйста, заполните все поля');
                return;
            }

            if (!getToken()) {
                alert('Пожалуйста, авторизуйтесь');
                return;
            }

            onAddPostClick({ description, imageUrl: resImg.fileUrl });
        };
    };
    render();
}
