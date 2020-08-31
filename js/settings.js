var pencilAll = document.querySelectorAll('.settings-container .pencil-position'),
    inputContainer = document.querySelectorAll('.settings-container .input-container'),
    inputFocus = document.querySelectorAll('.settings-container .input-focus'),
    pencilPosition = document.querySelectorAll('.settings-container .pencil-position'),
    replyPasswordContainer = document.querySelector('.replypassword-container');
    favoriteGenreItem = document.querySelectorAll('.favorite-genre-item'),
    genrePencil = document.querySelector('.genre-pencil');


function addReadonly(i){
        favoriteGenreClose();
        inputContainer[i].style.border = "none";
        inputFocus[i].setAttribute("readonly","readonly");
        pencilPosition[i].style.display = "block";
        inputFocus[i].style.color = "#B5B5B5";
    }

function removeReadonly(i){
        inputContainer[i].style.border = ".1rem solid #707070";
        inputFocus[i].style.color = "#686868";
        inputFocus[i].removeAttribute('readonly');
        pencilPosition[i].style.display = "none";

    }

function favoriteGenreClose(){
        genres.classList.remove('d-block');
        genres.classList.add("d-none");
        genrePencil.style.display = "block";
        // qelemin displayi none olmur bax
    }

function favoriteGenreOpen(){
        genres.classList.remove('d-none');
        genres.classList.add("d-block");
        genrePencil.style.display = "none";
    }

function settings_js() {

    for(let i = 0;i < favoriteGenreItem.length;i++){
        if(i%2==1) favoriteGenreItem[i].style.width = "25.5rem";
        if((i+1)%5==0) favoriteGenreItem[i].style.marginRight = "0";
    }

    for(let i = 0;i < pencilAll.length;i++){
        pencilAll[i].onclick = function(){
            for(let j = 0;j < inputFocus.length;j++) addReadonly(j);
            removeReadonly(i);
            if(i==3) replyPasswordContainer.style.display = "block";
            else replyPasswordContainer.style.display = "none";
        }
    }


    genres = document.querySelector('.genres');

    genrePencil.onclick = function(){
        for(let j = 0;j < inputFocus.length;j++) addReadonly(j);
        favoriteGenreOpen();
    }

}


function autoCompleteJS() {
    // body...
    let comp = encodeURIComponent('40,49')

    var options = {
          url: function(phrase) {
            		return "https://autosuggest.search.hereapi.com/v1/autosuggest?Accept-Language=q%3D0.9%3Bq%3D0.8%2Caz%3Bq%3D0.7&at=" + comp + "&size=5&result_types=address%2C+place%2C+chain%2C+category&tf=plain&q=" + phrase + "&apikey=y9kQaWgzK5EwZQTAYxYio7sLA1lPIGW013LxMQg_qCM";
            	},
          getValue: "title",
          listLocation:"items",
          requestDelay: 120,
          list: {
                match: {enabled: true},

        	},

          template: {
                type: "custom",
                method: function(value, item) {
                    try {
                        /* code */
                        return `<span name="sell_location" data-key="${item.id}"  data-position="${item.position.lat}, ${item.position.lng}" data-title="${item.title}"> ${item.title} </span>`;

                    } catch (e) {
                        return
                    }
                }
            },


          theme: "square"
        };
    $(".locations").easyAutocomplete(options);
}
