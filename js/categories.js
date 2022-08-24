let categories;

const getCategories = async () => {
    let result = await fetch(`https://api.jsonbin.io/v3/b/63065ce65c146d63ca7dbcbc`);
    let myJSON = await result.json();
    categories = myJSON['record']['categories'];
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