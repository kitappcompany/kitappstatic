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
        deliveryAll[deliveryAll.length - 1].children[2].style.display = "none";
    }

}

// butun metrolara catdirilir checkbox

subways = [
    ["Metro-Qara Qarayev", JSON.stringify({"name":"Metro-Qara Qarayev","displayLocation":"{\"Latitude\":\"40.41775\",\"Longitude\":\"49.93287\"}","lat":1,"lng":2})],
    ["Metro-Nizami", JSON.stringify({"name":"Metro-Nizami","displayLocation":"{\"Latitude\":\"40.3792\",\"Longitude\":\" 49.83009\"}","lat":"40.3792","lng":" 49.83009"})],
    ['Metro-İçərişəhər', JSON.stringify({"name":"Metro-İçərişəhər","displayLocation":"{\"Latitude\":\"40.36584\",\"Longitude\":\" 49.83151\"}","lat":"40.36584","lng":" 49.83151"})],
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
                            <input type="text" name="sell_locations" data-loc_data="${subways[sb][1]}" class = "input-val locations subwaysdata" value = "${subways[sb][0]}">
                            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/Path 413.svg" alt="" class = "ml-3 plas-delivery" onclick = "addDelivery();">
                            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/minus.svg" alt="" class = "ml-3 minus-delivery" onclick = "closeDelivery(this)">
                        </div>`

        let newNode = createElementFromHTML(newItem);

        deliveryContainer.insertBefore(newNode, deliveryContainer.childNodes[2])
    }

    autoCompleteJS();

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