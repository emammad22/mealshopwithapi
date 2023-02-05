var search = document.getElementById('reveal');
var list = document.getElementById('list');

// event listeners
search.addEventListener('search', loadProduct);

function loadProduct(e) {

    e.preventDefault();
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://www.themealdb.com/api/json/v1/1/categories.php`, true);

    xhr.onload = function () {
        let products = JSON.parse(this.responseText);


        for (let i = 0; i < products.categories.length; i++) {

            if (search.value.match(products.categories[i].strCategory)) {
                console.log(products.categories[i]);

                list.innerHTML += `
                <div class="product-card">
                         <div class="prod-img">
                             <img src="${products.categories[i].strCategoryThumb}" alt="product">
                            <h2 class="prod-name">${products.categories[i].strCategory}</h2>
                            <div class="prod-info">
                                <p class="prod-about">${products.categories[i].strCategoryDescription}</p>
                            </div>
                        </div>
                    </div>
                `
                break;
            } else {
                console.log("product is not available");
                continue;
            }
        }
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