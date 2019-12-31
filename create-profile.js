function Update_User_Info() {
    let inputs = document.querySelector('#settings').querySelectorAll('input');
    const data = new FormData();

    let json_data = {}
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].name.length === 0) continue;
        if (inputs[i].name === 'interests') {
            data.append('interests', parseInt(inputs[i].value))
        }
        else json_data[inputs[i].name] = inputs[i].value;
    }
    const request = new XMLHttpRequest();
    request.open("PUT", '/accounts-api/updateuser/'+json_data["user_id"], true)
    request.setRequestHeader("X-CSRFToken", json_data["csrf_token"])
    request.setRequestHeader("Authorization", "Token " + json_data["user_token"])

    request.onload = ()=>{
        res = JSON.parse(request.responseText)
        window.location.href = '/accounts/profile-complete'
    }

    data.append('full_name', json_data["full_name"])
    data.append('birthday', json_data["birthday"])
    data.append('location', json_data["location"])
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

