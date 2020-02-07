let deliveryContainer = document.querySelector('.delivery-container');
let locationInputTemp = Handlebars.compile(`<div class="delivery d-flex align-items-center py-2">
            <input data-key="" value="{{loc_name}}" list="suggestionsholder" type="text" class = "input-val locations">
            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/Path 413.svg" alt="" class = "ml-3 plas-delivery" onclick = "addDelivery();return false;">
            </div>`);


function addDelivery(loc_name=null){
    deliveryContainer.insertAdjacentHTML('beforeend', locationInputTemp({'loc_name':loc_name}) ) ;
    autoCompleteJS();
}

function autoCompleteJS() {
    // body...
    var options = {
          url: function(phrase) {
            		return "https://places.sit.ls.hereapi.com/places/v1/autosuggest?in=40%2C49%3Br%3D500000&size=5&result_types=address%2C+place%2C+chain%2C+category&tf=plain&q=" + phrase + "&apikey=y9kQaWgzK5EwZQTAYxYio7sLA1lPIGW013LxMQg_qCM";
            	},
          getValue: "title",

          list: {
                match: {enabled: true},
        		onSelectItemEvent: function() {
        			var value = $(".locations").getSelectedItemData().id;
        			$(".locations").dataset.key=value;
        		}
        	},

          theme: "square"
        };
        $(".locations").easyAutocomplete(options);
}

// /MAPS PLACE API
function SuggestPlace(event) {
    if (event.target.value.length < 3 || event.target.value.length % 2 !=0) {
        return
    }
    else{
        var options = {
          url: function(phrase) {
            		return "https://places.sit.ls.hereapi.com/places/v1/autosuggest?in=40%2C49%3Br%3D500000&size=5&result_types=address%2C+place%2C+chain%2C+category&tf=plain&q=" + phrase + "&apikey=y9kQaWgzK5EwZQTAYxYio7sLA1lPIGW013LxMQg_qCM";
            	},
          getValue: "title",
          list: {
            match: {
              enabled: true
            }
          },
          theme: "square"
        };
        $(".locations").easyAutocomplete(options);

    }

    // else{
    //         var input = event.target;
    //         let url = "https://places.sit.ls.hereapi.com/places/v1/autosuggest?in=40%2C49%3Br%3D500000&size=5&result_types=address%2C+place%2C+chain%2C+category&tf=plain&";
    //         let parameters = "q="+ input.value + "&apikey=y9kQaWgzK5EwZQTAYxYio7sLA1lPIGW013LxMQg_qCM"
    //         const request = new XMLHttpRequest();
    //         request.open("GET", url+parameters)

    //         request.onload = ()=>{
    //             // init some parameters
    //             let res = JSON.parse(request.responseText),
    //             dataAll = res["results"],
    //             optionsPlace = document.querySelector("#suggestionsholder");

    //             const temp = Handlebars.compile('{{#each names}} {{#if this.id}} <option data-position="{{this.position}}" data-pk="{{this.id}}" value="{{this.title}}"> {{this.vicinity}} </option>{{/if}} {{/each}}')
    //             // fill datalist with options suggested by API HERE
    //             optionsPlace.innerHTML = temp({"names":dataAll});

    //         }
    //         request.send()
    //     }
}


