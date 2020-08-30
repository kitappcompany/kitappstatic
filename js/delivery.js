let deliveryContainer = document.querySelector('.delivery-container');
let locationInputTemp = Handlebars.compile(`<div class="delivery d-flex align-items-center py-2">
            <input id={{unique}}  value="{{loc_name}}" data-loc_data='{{loc_data}}' name="sell_locations" type="text" class = "input-val locations">
            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/Path 413.svg" alt="" class = "ml-3 plas-delivery" onclick = "addDelivery();return false;">
            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/minus.svg" alt="" class = "ml-3 minus-delivery" onclick = "closeDelivery(this)">
            </div>`);

function addDelivery(loc_name=null, loc_data=null){
    let unique =  Math.random().toString(36).substr(2, 9);
    deliveryContainer.insertAdjacentHTML('beforeend', locationInputTemp({'unique':unique,'loc_name':loc_name, 'loc_data':loc_data}) ) ;
    autoCompleteJS('#'+unique);
    checkPlusMinus();
}

function closeDelivery(thisDelivery){
    if(deliveryContainer.children.length > 3) thisDelivery.parentElement.remove();
    checkPlusMinus();
}


function autoCompleteJS(id = false) {
    // body...
    if (!id) id = ".locations";


    let mypos = document.getElementById('mypos').dataset.mypos;
    let comp = encodeURIComponent('40,49')
    if (mypos != '' | mypos==null) {
        let d = JSON.parse(mypos)
        let lat =  parseFloat(d['Latitude']);
        let lng = parseFloat(d['Longitude']);
        comp = encodeURIComponent(`${lat},${lng}`)
    }

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
                    return `<span name="sell_location" data-key="${item.id}"  data-position="${item.position.lat}, ${item.position.lng}" data-title="${item.title}"> ${item.title} </span>`;
                }
            },


          theme: "square"
        };
    $(id).easyAutocomplete(options);
}

// Brand New

function checkPlusMinus(){
    let deliveryAll = document.querySelectorAll('.delivery');

    if(deliveryAll.length == 1) {
        deliveryAll[0].children[1].classList.remove('none-delivery')
        deliveryAll[0].children[2].classList.add('none-delivery')
    }

    if(deliveryAll.length  > 1){
        for(let d = 0;d < deliveryAll.length-1;d++){
            deliveryAll[d].children[1].style.display = "none";
            deliveryAll[d].children[2].style.display = "block";
        }
        deliveryAll[deliveryAll.length - 1].children[2].style.display = "block";
    }

}

// butun metrolara catdirilir checkbox

subways = [
    ["Metro-Qara Qarayev", {"name":"Metro-Qara Qarayev","displayLocation":"{\"Latitude\":\"40.41775\",\"Longitude\":\"49.93287\"}","lat":1,"lng":2}],
    ["Metro-Nizami", {"name":"Metro-Nizami","displayLocation":"{\"Latitude\":\"40.3792\",\"Longitude\":\" 49.83009\"}","lat":"40.3792","lng":" 49.83009"}],
    ['Metro-İçərişəhər', {"name":"Metro-İçərişəhər","displayLocation":"{\"Latitude\":\"40.36584\",\"Longitude\":\" 49.83151\"}","lat":"40.36584","lng":" 49.83151"}],
    ['Metro-Dərnəgül', {"name":"Metro-Dərnəgül","displayLocation":"{\"Latitude\":\"40.42552\",\"Longitude\":\" 49.86303\"}","lat":"40.42552","lng":" 49.86303"}],
    ['Metro-Şah İsmail Xətai', {"name":"Metro-Şah İsmail Xətai","displayLocation":"{\"Latitude\":\"40.38303\",\"Longitude\":\" 49.87196\"}","lat":"40.38303","lng":" 49.87196"}],
    ['Metro-Bakmil', {"name":"Metro-Bakmil","displayLocation":"{\"Latitude\":\"40.41408\",\"Longitude\":\" 49.87932\"}","lat":"40.41408","lng":" 49.87932"}],
    ['Metro-Ulduz', {"name":"Metro-Ulduz","displayLocation":"{\"Latitude\":\"40.415\",\"Longitude\":\" 49.89236\"}","lat":"40.415","lng":" 49.89236"}],
    ['Metro-Neftçilər', {"name":"Metro-Neftçilər","displayLocation":"{\"Latitude\":\"40.41052\",\"Longitude\":\" 49.94356\"}","lat":"40.41052","lng":" 49.94356"}],
    ['Metro-Xalqlar Dostluğu', {"name":"Metro-Xalqlar Dostluğu","displayLocation":"{\"Latitude\":\"40.3982\",\"Longitude\":\" 49.95217\"}","lat":"40.3982","lng":" 49.95217"}],
    ['Metro-Həzi Aslanov', {"name":"Metro-Həzi Aslanov","displayLocation":"{\"Latitude\":\"40.37395\",\"Longitude\":\" 49.9539\"}","lat":"40.37395","lng":" 49.9539"}],
    ['Metro-Əhmədli', {"name":"Metro-Əhmədli","displayLocation":"{\"Latitude\":\"40.38442\",\"Longitude\":\" 49.95427\"}","lat":"40.38442","lng":" 49.95427"}],
    ['Metro-28 May', {"name":"Metro-28 May","displayLocation":"{\"Latitude\":\"40.38255\",\"Longitude\":\" 49.84686\"}","lat":"40.38255","lng":" 49.84686"}],
    ['Metro-20 Yanvar', {"name":"Metro-20 Yanvar","displayLocation":"{\"Latitude\":\"40.40354\",\"Longitude\":\" 49.80787\"}","lat":"40.40354","lng":" 49.80787"}],
    ['Metro-Memar Acəmi', {"name":"Metro-Memar Acəmi","displayLocation":"{\"Latitude\":\"40.41045\",\"Longitude\":\" 49.81363\"}","lat":"40.41045","lng":" 49.81363"}],
    ['Metro-Avtovağzal', {"name":"Metro-Avtovağzal","displayLocation":"{\"Latitude\":\"40.41841\",\"Longitude\":\" 49.79883\"}","lat":"40.41841","lng":" 49.79883"}],
    ['Metro-Cəfər Cabbarlı', {"name":"Metro-Cəfər Cabbarlı","displayLocation":"{\"Latitude\":\"40.38024\",\"Longitude\":\" 49.85046\"}","lat":"40.38024","lng":" 49.85046"}],
    ['Metro-Gənclik', {"name":"Metro-Gənclik","displayLocation":"{\"Latitude\":\"40.40113\",\"Longitude\":\" 49.85253\"}","lat":"40.40113","lng":" 49.85253"}],
    ['Metro-Nərimanov', {"name":"Metro-Nərimanov","displayLocation":"{\"Latitude\":\"40.40273\",\"Longitude\":\" 49.87133\"}","lat":"40.40273","lng":" 49.87133"}],
    ['Metro-Koroğlu', {"name":"Metro-Koroğlu","displayLocation":"{\"Latitude\":\"40.4211\",\"Longitude\":\" 49.91776\"}","lat":"40.4211","lng":" 49.91776"}],
    ['Metro-Elmlər Akademiyası',{"name":"Metro-Elmlər Akademiyası","displayLocation":"{\"Latitude\":\"40.37519\",\"Longitude\":\" 49.81234\"}","lat":"40.37519","lng":" 49.81234"}],
    ['Metro-İnşaatçılar', {"name":"Metro-İnşaatçılar","displayLocation":"{\"Latitude\":\"40.38897\",\"Longitude\":\" 49.80316\"}","lat":"40.38897","lng":" 49.80316"}],
    ['Metro-Nəsimi', {"name":"Metro-Nəsimi","displayLocation":"{\"Latitude\":\"40.42443\",\"Longitude\":\" 49.8239\"}","lat":"40.42443","lng":" 49.8239"}],
    ['Metro-Azadlıq Prospekti', {"name":"Metro-Azadlıq Prospekti","displayLocation":"{\"Latitude\":\"40.42531\",\"Longitude\":\" 49.8426\"}","lat":"40.42531","lng":" 49.8426"}]
    ]

let SubwayRadioButton = document.querySelector(".subway__radio-button"), SubwayRadioContent = document.querySelector('.subway__radio-content'),SubwayCheckRadio = false;
SubwayRadioButton.onclick = function(){
    if(!SubwayCheckRadio){
        SubwayRadioContent.style.display = "inline-block";
        SubwayCheckRadio = true;
        addSubways();
        checkPlusMinus();
    }
    else{
        SubwayRadioContent.style.display = "none";
        SubwayCheckRadio = false;
        removeSubways();
        checkPlusMinus();
    }
}

function addSubways() {

    for(let sb = 0; sb < subways.length;sb++){
        let newItem = ` <div class="delivery d-flex align-items-center py-2 subwaysdata">
                            <input type="text" name="sell_locations" data-loc_data='${subways[sb][1]}' class = "input-val locations subwaysdata" value = "${subways[sb][0]}">
                            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/Path 413.svg" alt="" class = "ml-3 plas-delivery" onclick = "addDelivery();">
                            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/minus.svg" alt="" class = "ml-3 minus-delivery" onclick = "closeDelivery(this)">
                        </div>`

        let newNode = createElementFromHTML(newItem);

        deliveryContainer.insertBefore(newNode, deliveryContainer.childNodes[2])
    }

    // autoCompleteJS();
    heckPlusMinus()
}


function removeSubways() {
    // remove elements that has class subwaysdata

    let all_subeays = document.querySelectorAll('.subwaysdata');

    for (var i = 0; i < all_subeays.length; i++) {
        all_subeays[i].remove();
    }
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}