
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

    var name = ['title', 'author.full_name', 'genre.name', 'condition', 'price','language.name', 'image', 'image', 'image', 'locations'];
    const data = new FormData();

    let images_place =  []
    for (var i = 0; i < inputs.length; i++) {
        if (name.length <= i) name.push("locations"); // add location, last elements are location
        if (name[i]==='price' && radioBtnOnclick) {data.append(name[i], 0); continue}

        if (name[i]==='locations') {
            try{
                inputs[i].style.borderColor = "";
                add_style('::placeholder { color: rgb(245, 76, 110); }');
                listElement = inputs[i].parentElement.querySelector('.selected').children[0].children[0];

                let city_name = ""
                city_name = listElement.dataset.city.split(',');
                city_name = city_name[city_name.length-1]

                let loc_data = {"title":listElement.dataset.title,"pk":listElement.dataset.key, "position":listElement.dataset.position, "city":city_name} ;
                data.append(name[i], JSON.stringify(loc_data) );
                continue;
            }catch(e){
                    adPlaceButton.disabled = false;
                     if (method==="POST") {
                        adPlacePopup.querySelector('img').src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/img/404.svg";
                        adPlacePopup.querySelector('.ad-place-popup-header').innerHTML = "Error"
                        inputs[i].style.borderColor = "red";
                        inputs[i].value="";
                        return;
                     } else if (method==="PATCH"  & inputs[i].value.length != 0) {  data.append(name[i], JSON.stringify({"title":inputs[i].value}) );  continue; }
                      else {continue; }
            }
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

            // after 3 sec take user to home page
            setInterval(function(){ window.location.href = '/' },1800)

        }
        else {
            adPlacePopup.querySelector('img').src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/404.svg";
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


// UPLOAD PRO
function PostABookPro(images_data,locations_data, adPlacePopup, adPlaceButton, method="POST", url="/catalog-api/createabook") {

    // if no images uploaded
    if (!images_data) {
        popupError( adPlacePopup, adPlaceButton);
        show_error_images(true);
        return
    }

    // DATA FOR REQUEST
    let csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    let user_token = document.querySelector("#user_token").value;

    let title = document.getElementsByName("sell_title")[0].value;
    let author = document.getElementsByName("sell_author")[0].value;
    let genre = document.getElementsByName("sell_genre")[0].value;
    let price = document.getElementsByName("sell_price")[0].value;
    let condition = document.getElementsByName("sell_condition")[0].value;
    let summary = document.getElementsByName("sell_summary")[0].value;
    let language = document.getElementsByName("sell_language")[0].value;
    let pictures = document.getElementsByName("sell_pictures");


    // data to request
    let datam = {
        "title": title, "condition": condition,
        "author": { "full_name": author },
        "summary": "sd", "price": 1,
        "genre": { "name": genre },
        "language": { "name": language, "short_name": language},
        "locations": locations_data,
        "img": images_data
        }

    console.log(datam);

    // REQUEST STAFF
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.setRequestHeader("Authorization", "Token " + user_token);
    request.setRequestHeader("X-CSRFToken", csrf);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = ()=>{
        console.log(request.responseText,"RESPONSE")
        if (request.status === 201 || request.status === 200) popupSuccess(adPlacePopup, adPlaceButton, method);
        else {
            popupError( adPlacePopup, adPlaceButton);
            let errors = JSON.parse(request.responseText);
            show_errors(errors)
        }

    }
    request.send(JSON.stringify(datam));
}

function make_location(locations, adPlacePopup, adPlaceButton) {
    document.getElementsByName("sell_locations")[0].style.borderColor = "";
    // body...
    locations_data = [];

    for (var i = 0; i < locations.length; i++) {
        let location_ = locations[i];
        try{
            location_.style.borderColor = "";
            add_style('::placeholder { color: rgb(245, 76, 110); }');
            let listElement = location_.parentElement.querySelector('.selected').children[0].children[0];

            let position = listElement.dataset.position.split(",");

            let loc_data = {
                "locations.name":listElement.dataset.title,
                "locations.displayLocation":{"Latitude":position[0], "Longitude":position[1]},
                "lat":1, "lng":2
            } ;

            loc_data_pro = JSON.stringify(loc_data)
            loc_data['data'] = loc_data_pro

            if (!location_) {
                popupError( adPlacePopup, adPlaceButton);
                location_.style.borderColor = "red";
                return []
            };

            locations_data.push(location_)


        }catch(e){
            popupError( adPlacePopup, adPlaceButton);
            location_.style.borderColor = "red";
            return [];
        }
    }

    // if nothing for loop means one location field
    if (!locations_data.length) {
        popupError( adPlacePopup, adPlaceButton);
        document.getElementsByName("sell_locations")[0].style.borderColor = "red";
        return []
    };
    return locations_data
}

function upload_image( adPlacePopup, adPlaceButton, method="POST", url="/catalog-api/createabook"){
    // Show user that uploading
    // FOR USER EXPERIENCE
    show_popup(adPlacePopup, adPlaceButton);

    // check that all fields are OK
    let errors =  validate() ;
    if ( errors[0] ) {popupError( adPlacePopup, adPlaceButton); show_errors(errors[1]); return;}

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!/////////////////
    // UPLOAD STAFF
    let images = document.getElementsByName("sell_pictures");
    let images_data = []
    let count_imgs=0;

    for (var i = 0; i < images.length; i++) {
        if (images[i].files.length) count_imgs++;
    }

    if (count_imgs === 0) {
        popupError( adPlacePopup, adPlaceButton);
        show_error_images(true);
        return
    }

    // Get locations as JSON for request
    let locations = document.getElementsByName("sell_location");
    let locations_data = make_location(locations, adPlacePopup, adPlaceButton);
    if (!locations_data.length) return;

    for (var i = 0; i < images.length; i++) {

          var files = images[i].files;
          if (!files.length) {
            continue ;
          }
          var file = files[0];
          var fileName = file.name;
          var albumPhotosKey = encodeURIComponent(albumBucketName) + "/";

          var photoKey = albumPhotosKey + fileName;
          // Use S3 ManagedUpload class as it supports multipart uploads
          var upload = new AWS.S3.ManagedUpload({
            params: {
              Bucket: albumBucketName,
              Key: photoKey,
              Body: file,
              ACL: "public-read"
            }
          });

          var promise = upload.promise();

          promise.then(
            function(data) {
                images_data.push({"img":data.Location, "opt_img":data.Location})

                if ( images_data.length === count_imgs) {
                    PostABookPro(images_data,locations_data, adPlacePopup, adPlaceButton, method, url);
                }
            },
            function(err) {
              popupError( adPlacePopup, adPlaceButton);
              show_error_images(true);
            }
          );

    }

    return images_data;
}

// VALIDATIONS
function validate() {
    // validate fields that cant be blank

     let title = document.getElementsByName("sell_title")[0].value.length,
     author = document.getElementsByName("sell_author")[0].value.length,
     genre = document.getElementsByName("sell_genre")[0].value.length,
     price = document.getElementsByName("sell_price")[0].value.length,
     condition = document.getElementsByName("sell_condition")[0].value.length,
     summary = document.getElementsByName("sell_summary")[0].value.length,
     language = document.getElementsByName("sell_language")[0].value.length;

    let errors = {"title":null,"author":null,"genre":null,"price":null,"condition":null, "language":null, "summary":null };
    let is_error = false;

    if (!title) { errors['title'] = "Boş buraxıla bilməz", is_error=true };
    if (!author) { errors['author'] = "Boş buraxıla bilməz", is_error=true };
    if (!genre) { errors['genre'] = "Boş buraxıla bilməz", is_error=true };
    if (!price) { errors['price'] = "Boş buraxıla bilməz", is_error=true };
    if (!condition) { errors['condition'] = "Boş buraxıla bilməz", is_error=true };
    if (!language) { errors['language'] = "Boş buraxıla bilməz", is_error=true };
    if (!summary) { errors['summary'] = "Boş buraxıla bilməz", is_error=true };

    // make images normal
    show_error_images(false);
    console.log(is_error, errors)
    return [is_error, errors];

}

// show errors to user
function show_error_images(action) {
    console.log("SHOW ERRORS")
    let img = document.querySelector('.upload-container');
    if (action) img.style.borderColor= "red";
    else img.style.borderColor= "";
}
function show_errors(errors) {
    // body...
    console.log("SHOW ERRORS")

    // add style to placeholder
    add_style('::placeholder { color: rgb(245, 76, 110); }');

    // show errors
    let fields = ['title', 'author', 'genre', 'condition', 'price',  'summary', 'locations', 'language'];

    // for some fields
    for (var i = 0; i < fields.length; i++) {
         let input = document.getElementsByName("sell_"+fields[i])[0];
         if (input === undefined) continue;

         if (errors[fields[i]]!=undefined & errors[fields[i]]!=null){
             input.value = "";input.placeholder = errors[fields[i]];
             input.style = "border: 0.1rem solid rgb(245, 76, 110);";

             if (fields[i] === 'locations') input.placeholder = "Bir məkan daxil edin.";
         }
         else {
             input.style = "";input.placeholder = "";
         }
    }

}
function show_popup(adPlacePopup, adPlaceButton) {
        console.log("SHOW ERRORS")

    adPlaceButton.disabled = true;
    adPlacePopup.querySelector('img').src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/myicons/comment.svg"
    adPlacePopup.querySelector('.ad-place-popup-header').innerHTML = "Elanınız yayınlanır ..."
    adPlacePopup.style.display = "block";

}
function popupError( adPlacePopup, adPlaceButton) {
    // body...
    adPlaceButton.disabled = false;
    adPlacePopup.querySelector('img').src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/404.svg";
    adPlacePopup.querySelector('.ad-place-popup-header').innerHTML = "Error"
}
function popupSuccess(adPlacePopup, adPlaceButton, method) {
    // body...

            let info = "Elanınız yayınlandı";
            if (method==="PATCH") {
                info = "Məlumatlar uğurla dəyişdirildi."
            }
            adPlacePopup.querySelector('img').src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/undraw_done_a34v.svg";
            adPlacePopup.querySelector('.ad-place-popup-header').innerHTML = info

            // after 3 sec take user to home page
            // setInterval(function(){ window.location.href = '' },1800)


}