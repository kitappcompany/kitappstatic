let deliveryContainer = document.querySelector('.delivery-container');
let locationInputTemp = Handlebars.compile(`<div class="delivery d-flex align-items-center py-2">
            <input  value="{{loc_name}}" type="text" class = "input-val locations">
            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/Path 413.svg" alt="" class = "ml-3 plas-delivery" onclick = "addDelivery();return false;">
            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/minus.svg" alt="" class = "ml-3 minus-delivery" onclick = "closeDelivery(this)">
            </div>`);

function addDelivery(loc_name=null){
    deliveryContainer.insertAdjacentHTML('beforeend', locationInputTemp({'loc_name':loc_name}) ) ;
    autoCompleteJS();
    headDelivery();
}

function closeDelivery(thisDelivery){
    thisDelivery.parentElement.remove();
    headDelivery();
}

function headDelivery(){
    let headD = document.querySelector('.head-d');
    if(deliveryContainer.children.length < 3) headD.style.display = "inline-block";
    else headD.style.display = "none";
}

function autoCompleteJS() {
    // body...
    var options = {
          url: function(phrase) {
            		return "https://places.sit.ls.hereapi.com/places/v1/autosuggest?in=40%2C49%3Br%3D500000&size=5&result_types=address%2C+place%2C+chain%2C+category&tf=plain&q=" + phrase + "&apikey=y9kQaWgzK5EwZQTAYxYio7sLA1lPIGW013LxMQg_qCM";
            	},
          getValue: "title",
          listLocation:"results",
          requestDelay: 500,
          list: {
                match: {enabled: true},

        	},

          template: {
                type: "custom",
                method: function(value, item) {
                    return `<span data-key="${item.id}" data-position="${item.position}" data-title="${item.title}"> ${item.title} </span>`;
                }
            },


          theme: "square"
        };
        $(".locations").easyAutocomplete(options);
}
