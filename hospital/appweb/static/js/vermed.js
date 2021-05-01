function volver(){
    window.history.back();
}
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var posicion;
var posUs;
function getParametros(){
    let ruta = new String(window.location);
    const usuario = ruta.split("?");
    let data = {
        nombre: usuario[1],
    }
    console.log(data);
    fetch("/ver-medicina/", {
        method: "POST",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Request-With": "XMLHttpRequest"
        },
        body: JSON.stringify(data),
        mode: "cors",
        cache: "default",
        credentials: "include"
    }).then(
        function(respuesta){
            respuesta.text().then(
                function(da){
                    console.log(da)
                    console.log(da)
                    let ingreso = da.split(",")
                    let seccion2 = document.getElementById("seccion2");
                    let panom = document.createElement("p");
                    let papre = document.createElement("p");
                    let pades = document.createElement("p");
                    let pacan = document.createElement("p");
                    panom.innerHTML = "Nombre: "+ingreso[0];
                    papre.innerHTML = "Precio: "+ingreso[1];
                    pades.innerHTML = "Descripción: "+ingreso[2];
                    pacan.innerHTML = "Cantidad: "+ingreso[3];
                    seccion2.appendChild(panom);
                    seccion2.appendChild(papre);
                    seccion2.appendChild(pades);
                    seccion2.appendChild(pacan);
                }
            );
        }
    ).catch(
        function(error){
            alert("Ha ocurrido algun error")
            console.log(error)
        }
    );
}




window.addEventListener("load", getParametros);