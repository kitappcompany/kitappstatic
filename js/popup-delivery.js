var once = true;
function popupdelivery() {

    let deliveryButton = document.querySelector('.delivery-button'),
    popupMap = document.querySelector('.popup-map'),
    mapContainer = document.querySelector('.map-container'),
    popupContainer = document.querySelector('.popup-container'),clickCheck = false;

    deliveryButton.onclick = function(){
        if(!clickCheck){
            openDelivery();

            // Show map and add locations
            //if once run then no need to run again for each post
            if (once) {
                initmap(); once=false;
                maps_HERE(all_locations_obj)//add locations of each book
            }

        }
        else{
            closeDelivery();
        }
    }
}//function end

//xeritenin acilmasi
function openDelivery(){
    popupMap.style.display = "block";
    deliveryButton.style.borderBottom = ".1rem solid #707070";
    deliveryButton.style.color = "#686868";
    popupContainer.style.top = "72%";
    clickCheck = true;
}
//xeritenin baglanmasi
function closeDelivery(){
    popupMap.style.display = "none";
    popupContainer.style.top = "50%";
    deliveryButton.style.borderBottom = "none";
    deliveryButton.style.color = "#5CB4F1";
    clickCheck = false;
}