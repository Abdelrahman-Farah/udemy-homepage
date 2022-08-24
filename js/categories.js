let categories;

const getCategories = async () => {
    const categoriesRaw = await fetch('http://localhost:3000/categories');
    categories = await categoriesRaw.json();
    buildCategories();
}

window.addEventListener('DOMContentLoaded', () => getCategories());


const categoriesContainer = document.querySelector('#categories-container');
function buildCategories(tab) {
    categoriesContainer.innerHTML = '';
    for (let category of categories) {
        categoriesContainer.innerHTML += `
            <div class="d-flex flex-column  col-sm-6 col-md-4 col-lg-3">
                <img class="img-fluid" src="${category['image']}" alt="">
                <h3>${category['title']}</h3>
            </div>
        `;
    }
}