var search = document.getElementById('reveal');
var list = document.getElementById('list');

// event listeners
search.addEventListener('search', loadProduct);

function loadProduct(e) {

    e.preventDefault();
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search.value.trim()}`, true);

    xhr.onload = function () {
        let products = JSON.parse(this.responseText);
        if (products.meals) {
            products.meals.forEach(element => {
                console.log(products.meals);

                list.innerHTML += `
                <div class="product-card">
                    <div class="prod-img">
                        <img src="${element.strMealThumb}" alt="${element.strMeal}">
                    </div>
                    <div class="product-head">
                        <h2 class="prod-name">${element.strMeal}</h2>
                    </div>
                    <div class="prod-info">
                        <button class="information">Get Information</button>
                    </div>
                </div>
                `
            });
        }

        // }
    }
    xhr.send();
}




   // products.categories.forEach(meal => {
                //     list.innerHTML += `
                    // <div class="product-card">
                    //      <div class="prod-img">
                    //          <img src="${meal.strCategoryThumb}" alt="product">
                    //         <h2 class="prod-name">${meal.strCategory}</h2>
                    //         <div class="prod-info">
                    //             <p class="prod-about">${meal.strCategoryDescription}</p>
                    //         </div>
                    //     </div>
                    // </div>
                //     `
                // });