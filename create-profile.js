function Update_User_Info() {
    let inputs = document.querySelector('#settings').querySelectorAll('input');
    const data = new FormData();

    let json_data = {}
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].name.length === 0 || inputs[i].name === 'email') continue;
        if (inputs[i].name === 'interests') {
            data.append('interests', inputs[i].value)
        }
        if (inputs[i].name === 'location') {
            try{
                let dataset = inputs[i].parentElement.querySelector('.selected').children[0].children[0].dataset;
                data.append('location', JSON.stringify({"title":inputs[i].value, "position":dataset.position, "key":dataset.key}))
            }catch(e){
                // error happened
            }

            }
        else json_data[inputs[i].name] = inputs[i].value;
    }
    const request = new XMLHttpRequest();
    request.open("PATCH", '/accounts-api/updateuser/'+json_data["user_id"], true)
    request.setRequestHeader("X-CSRFToken", json_data["csrf_token"])
    request.setRequestHeader("Authorization", "Token " + json_data["user_token"])

    request.onload = ()=>{
        window.location.href = '/accounts/profile-complete'
    }

    data.append('full_name', json_data["full_name"])
    data.append('birthday', json_data["birthday"])
    data.append('password', json_data["password"]),
    data.append('re_password', json_data["re_password"])
    request.send(data)
}

function Get_Genres() {
    const request = new XMLHttpRequest();
    request.open("GET", '/catalog-api/listgenres', true)

    request.onload = ()=>{
        res = JSON.parse(request.responseText)
        if (request.status === 200) {
            temp = Handlebars.compile(document.querySelector("#genre-html").innerHTML);
            let col_1 = [2,4,2,4], col_2 = [4,2,4,2], col=col_1, j = 0;

            for (let i = 0; i < res.results.length; i++) {
                if ( i%4 === 0 && i!=0) { j=0; if (col===col_1) {col=col_2} else col=col_1 }
                document.querySelector(".genres").children[0].innerHTML += temp({"genre":res.results[i], "col":col[j]})
                j++;
            }

            genres_js();
        }
        else{
            //add error
            console.log(res)
        }
    }

    request.send()


}

function autoCompletePC(event) {
    var options = {
          url: function(phrase) {
            		return "https://places.sit.ls.hereapi.com/places/v1/autosuggest?in=40%2C49%3Br%3D500000&size=5&result_types=address%2C+place%2C+chain%2C+category&tf=plain&q=" + phrase + "&apikey=y9kQaWgzK5EwZQTAYxYio7sLA1lPIGW013LxMQg_qCM";
            	},
          getValue: "title",
          listLocation:"results",
          requestDelay: 850,
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

        document.querySelector('.easy-autocomplete').className = ""; // make location readonly style
}