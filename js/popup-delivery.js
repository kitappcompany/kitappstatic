var once = true;
function popupdelivery() {

        let deliveryButton = document.querySelector('#popup .delivery-button'),
        popupMap = document.querySelector('#popup .popup-map'),
        popupContainer = document.querySelector('#popup .popup-container'),clickCheck = false;

        deliveryButton.onclick = function(){
            if(!clickCheck){
                openDelivery();
            }
            else{
                closeDelivery();
            }
        }
        //xeritenin acilmasi
        function openDelivery(){
            popupMap.style.display = "block";
            deliveryButton.style.borderBottom = ".1rem solid #707070";
            deliveryButton.style.color = "#686868";
            popupContainer.style.top = "72%";
            clickCheck = true;

            // Show map and add locations
            //         //if once run then no need to run again for each post
            if (once) {
                initmap(); once=false;
                maps_HERE(all_locations_obj)//add locations of each book
            }
        }
        //xeritenin baglanmasi
        function closeDelivery(){
            popupMap.style.display = "none";
            popupContainer.style.top = "50%";
            deliveryButton.style.borderBottom = "none";
            deliveryButton.style.color = "#5CB4F1";
            clickCheck = false;
        }
        closeDelivery(); //brandnew


}//function end


