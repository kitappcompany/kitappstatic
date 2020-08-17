let deliveryContainer = document.querySelector('.delivery-container');
let locationInputTemp = Handlebars.compile(`<div class="delivery d-flex align-items-center py-2">
            <input  value="{{loc_name}}" data-loc_data='{{loc_data}}' name="sell_locations" type="text" class = "input-val locations">
            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/Path 413.svg" alt="" class = "ml-3 plas-delivery" onclick = "addDelivery();return false;">
            <img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/minus.svg" alt="" class = "ml-3 minus-delivery" onclick = "closeDelivery(this)">
            </div>`);

function addDelivery(loc_name=null, loc_data=null){
    deliveryContainer.insertAdjacentHTML('beforeend', locationInputTemp({'loc_name':loc_name, 'loc_data':loc_data}) ) ;
    autoCompleteJS();
}

function closeDelivery(thisDelivery){
    if(deliveryContainer.children.length > 3) thisDelivery.parentElement.remove();
}


function autoCompleteJS() {
    // body...

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
          requestDelay: 500,
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
        $(".locations").easyAutocomplete(options);
}
