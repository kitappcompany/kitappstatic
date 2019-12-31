let deliveryContainer = document.querySelector('.delivery-container');
let locationInputTemp = Handlebars.compile(`<div class="delivery d-flex align-items-center py-2">
            <input value="{{loc_name}}" list="suggestionsholder" type="text" class = "input-val" oninput="SuggestPlace(event)">
            <img src="/static/icons/Path 413.svg" alt="" class = "ml-3 plas-delivery" onclick = "addDelivery();return false;">
            </div>`);


function addDelivery(loc_name=null){
    deliveryContainer.insertAdjacentHTML('beforeend', locationInputTemp({'loc_name':loc_name}) ) ;
}


// /MAPS PLACE API
function SuggestPlace(event) {
    if (event.target.value.length < 3 || event.target.value.length % 2 !=0) {
        return
    }
    else{
            var input = event.target;
            let url = "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?";
            let parameters = "query="+ input.value + "&apikey=y9kQaWgzK5EwZQTAYxYio7sLA1lPIGW013LxMQg_qCM"
            const request = new XMLHttpRequest();
            request.open("GET", url+parameters)

            request.onload = ()=>{
                // init some parameters
                let res = JSON.parse(request.responseText),
                dataAll = res["suggestions"],
                optionsPlace = document.querySelector("#suggestionsholder");

                const temp = Handlebars.compile('{{#each names}}<option value="{{this.label}}"></option>{{/each}}')
                // fill datalist with options suggested by API HERE
                optionsPlace.innerHTML = temp({"names":dataAll});

            }
            request.send()
        }
}


