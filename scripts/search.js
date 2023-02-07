var search = document.getElementById('reveal');
var list = document.getElementById('list');
var details = document.getElementById('details');
var instructions = document.getElementById('instructions');
var closeRecipe = document.getElementById('closeBtn');
var loader = document.getElementById('load');


// event listeners
search.addEventListener('input', loadProduct);
list.addEventListener('click', getRecipe);
closeRecipe.addEventListener('click', () => {
    details.innerHTML = "";
    instructions.style.display = "none";
    list.style.filter = "blur(0px)";
})

//  XMLHttp requests
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
    loader.style.display = "block";
    setTimeout(() => {
        xhr.open('GET', `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search.value.trim()}`, true);
        xhr.onload = function () {
            let products = JSON.parse(this.responseText);

            let html = '';
            loader.style.display = "none";
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
                    list.classList.remove('notFound');
                    list.classList.add('products');
                });
            } else {
                list.classList.remove('products');
                list.classList.add("notFound");
                html += "Sorry, this type product is not available...";
            }

            list.innerHTML = html;

        }
        xhr.send();

    }, 6100);

}

function getRecipe(e) {
    e.preventDefault();
    let clickEl = e.target.getAttribute('data-id');
    console.log(clickEl);

    xhr.open('GET', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${clickEl}`, true);
    if (e.target.classList.contains("information")) {
        let html = '';

        xhr.onload = function () {
            let data = JSON.parse(this.responseText);
            html = `
                <div class="recipe-header">
                 <h1 class="prod-name">${data.meals[0].strMeal}</h1>
                </div>
                <p class="instructions">${data.meals[0].strInstructions}</p>
                <div class="meal-img">
                <img src="${data.meals[0].strMealThumb}" alt="#">
                </div>
        `
            details.innerHTML = html;
            instructions.style.display = "block";
            list.style.filter = "blur(10px)";

        }
    }
    xhr.send();
}
