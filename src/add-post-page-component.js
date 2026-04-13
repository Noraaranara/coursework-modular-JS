import { getToken } from './api.js';
import { uploadImage } from './api.js';
import { renderHeaderComponent } from './header-component.js';
import { sanitize } from './helpers.js';

// рендер страницы добавления поста
export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    const render = () => {
        const appHtml = `
    <div class="page-container">
        <div class="form">
            <div class="header-container"></div>
            <h1 class="form-title">Добавить пост</h1>
            <div class="form-inputs">
            <textarea class="post-description textarea" placeholder="Описание картинки"></textarea>
            <input type="file" class="post-image" placeholder="URL картинки" accept="image/*">
            <img id="image-preview" style="display:none; max-width: 200px; margin-top:10px;" />
            <button class="button" id="add-button">Добавить</button>
            </div>
        </div>
    </div>
    `;

        appEl.innerHTML = appHtml;

        renderHeaderComponent({
            element: document.querySelector('.header-container'),
        });

        const descriptionInput = document.querySelector('.post-description');
        const imageInput = document.querySelector('.post-image');
        const addBtn = document.querySelector('#add-button');
        const imagePreview = document.querySelector('#image-preview');

        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        addBtn.onclick = async () => {
            const description = sanitize(descriptionInput.value.trim());
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
