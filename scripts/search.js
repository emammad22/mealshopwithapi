var search = document.getElementById('reveal');
var list = document.getElementById('list');
var recipeBtn = document.getElementById('recipe');
// event listeners
search.addEventListener('input', loadProduct);
list.addEventListener('click', getRecipe);

// requests
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://www.themealdb.com/api/json/v1/1/filter.php?i=', true);

// for initial view
xhr.onload = function () {
    let data = JSON.parse(this.responseText);
    let html = '';

    data.meals.forEach(element => {
        html += `
        <div class="product-card">
            <div class="prod-img">
                <img src="${element.strMealThumb}" alt="${element.strMeal}">
            </div>
            <div class="product-head">
                <h2 class="prod-name">${element.strMeal}</h2>
            </div>
            <div class="prod-info" >
                <button class="information" data-id = ${element.idMeal}>Get Information</button>
            </div>
        </div>
        `
    });
    list.innerHTML = html;

}
xhr.send();

// searching process
function loadProduct(e) {

    e.preventDefault();
    xhr.open('GET', `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search.value.trim()}`, true);

    xhr.onload = function () {
        let products = JSON.parse(this.responseText);

        let html = '';
        if (products.meals) {
            products.meals.forEach(element => {
                html += `
                <div class="product-card" >
                    <div class="prod-img">
                        <img src="${element.strMealThumb}" alt="${element.strMeal}">
                    </div>
                    <div class="product-head">
                        <h2 class="prod-name">${element.strMeal}</h2>
                    </div>
                    <div class="prod-info" >
                        <button class="information" data-id = ${element.idMeal}>Get Information</button>
                    </div>
                </div>
                `
            });
        }

        list.innerHTML = html;

    }
    xhr.send();
}

function getRecipe(e) {
    e.preventDefault();
    let clickParent = e.target.parentElement.parentElement;
    console.log(clickParent);
    let clickEl = e.target.getAttribute('data-id');
    console.log(clickEl);
    xhr.open('GET', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${clickEl}`, true);
    if (e.target.classList.contains("information")) {
        xhr.onload = function () {
            let data = JSON.parse(this.responseText);
            list.innerHTML += `
        <div class="recipe-modal">
        <div class="recipe-header">
            <button class="close"><i class="fa-sharp fa-solid fa-xmark"></i></button>
            <h1 class="prod-name">${data.meals[0].strMeal}</h1>
        </div>
        <p class="instructions">${data.meals[0].strInstructions}</p>
        <div class="meal-img">
            <img src="${data.meals[0].strMealThumb}" alt="#">
        </div>
    </div>
        `
        }
    }
    xhr.send();
}
