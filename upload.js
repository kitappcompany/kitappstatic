
// Post A Book Function
function PostABook(adPlacePopup, adPlaceButton, method="POST", url="/catalog-api/createabook") {
    adPlaceButton.disabled = true;
    adPlacePopup.querySelector('img').src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/myicons/comment.svg"
    adPlacePopup.querySelector('.ad-place-popup-header').innerHTML = "Elanınız yayınlanır ..."
    adPlacePopup.style.display = "block";

    let csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    let user_token = document.querySelector("#user_token").value;

    let sellbook = document.querySelector("#sell-book");
    let inputs = sellbook.querySelectorAll("input");
    let summary = sellbook.querySelector('textarea');

    var name = ['title', 'author.full_name', 'genre.name', 'condition', 'price', 'image', 'image', 'image', 'locations'];
    const data = new FormData();
    let images_place =  []
    for (var i = 0; i < inputs.length; i++) {
        if (name.length <= i) name.push("locations"); // add location, last elements are location
        if (name[i]==='price' && radioBtnOnclick) {data.append(name[i], 0); continue}

        if (name[i]==='locations') {
            let loc_data = {"title":inputs[i].dataset.title,"pk":inputs[i].dataset.key, "position":inputs[i].dataset.position} ;
            data.append(name[i], JSON.stringify(loc_data) );
            continue;
        }

        if (name[i]!="image") data.append(name[i], inputs[i].value);
        else{
            if(inputs[i].files[0]!=undefined){
                data.append(name[i]+"_"+i, inputs[i].files[0]);
                if (method==="PATCH") {//it means, wanted to update image at this place
                    images_place.push(inputs[i].dataset.nth);
                }
            }
        }
    }
    data.append("nth", images_place)
    data.append("summary", summary.value);

    // MAKING REQUEST
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.setRequestHeader("Authorization", "Token " + user_token)
    request.setRequestHeader("X-CSRFToken", csrf)

    request.onload = ()=>{
        adPlaceButton.disabled = false;
        if (request.status === 201 || request.status === 200) {
            let info = "Elanınız yayınlandı";
            if (method==="PATCH") {
                info = "Məlumatlar uğurla dəyişdirildi."
            }
            adPlacePopup.querySelector('img').src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/undraw_done_a34v.svg";
            adPlacePopup.querySelector('.ad-place-popup-header').innerHTML = info

        }
        else {
            adPlacePopup.querySelector('img').src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/img/404.svg";
            adPlacePopup.querySelector('.ad-place-popup-header').innerHTML = "Error"
            let error_az = {
                "title":"Kitabın adını daxil edin",
                "condition":" Kitabın Yeni və Köhnə olduğunu daxil edin ",
                "author":"Kitabın Müəllifinin adını daxil edin",
                "summary":"Kitab haqqında məlumat daxil edin",
                "price":"Yalnız ədəd daxil edin",
                "genre":"Kitabın janrını daxil edin",
                "image":"Kitabın ən azı bir şəkilini daxil edin",
                "locations":"Ən azı bir uyğun* çatdırılma yeri daxil edin"
            }

            // show to user what is wrong
            let arr = ['title', 'author', 'genre', 'condition', 'price', 'image','image', 'image', 'locations'];
            const res = JSON.parse(request.responseText);

            add_style('::placeholder { color: rgb(245, 76, 110); }');

            for (let i=0; i<arr.length; i++){

                if (res[arr[i]]!=undefined){
                    if(inputs[i].type != "file") {inputs[i].value = "";inputs[i].placeholder = error_az[arr[i]]; inputs[i].style = "border: 0.1rem solid rgb(245, 76, 110);";}
                }else{
                    if(inputs[i].type != "file") { inputs[i].style = "";inputs[i].placeholder = ""; }
                }

                if (res["summary"]!=undefined){
                    summary.style = "border: 0.1rem solid rgb(245, 76, 110);";
                    summary.placeholder = error_az["summary"]
                }else{
                    summary.style = "";
                    summary.placeholder = ""
                }
            }
            // end of for loop
        }//end of else

    }//end of onload

    request.send(data)
}

// add style to document
function add_style(argument, idName) {

        if (document.querySelector('#'+idName) != null) {
            document.querySelector('#'+idName).remove();
        }
        let css = argument,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

        head.appendChild(style);

        style.type = 'text/css';
        style.id = idName;
        if (style.styleSheet){
          // This is required for IE8 and below.
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
}