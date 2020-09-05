
let categoriesList = document.querySelectorAll("#menu .category-list li");
for(let ca = 0; ca < categoriesList.length;ca++){

    categoriesList[ca].onclick = function(){
        for(let caR = 0;caR < categoriesList.length;caR++){
            categoriesList[caR].classList.remove("categories-list__item-color");
        }
        categoriesList[ca].classList.add("categories-list__item-color");
    }
}