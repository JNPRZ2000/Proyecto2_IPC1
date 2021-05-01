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
        doctor: usuario[1]
    }
    console.log(data);
    fetch("/ver-doctor/", {
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
                    let ingreso = da.split(",")
                    let seccion2 = document.getElementById("seccion2");
                    let panom = document.createElement("p");
                    let paape = document.createElement("p");
                    let pafec = document.createElement("p");
                    let pasex = document.createElement("p");
                    let patel = document.createElement("p");
                    let paesp = document.createElement("p");
                    let pause = document.createElement("p");
                    let pacon = document.createElement("p");
                    panom.innerHTML = "Nombre: "+ingreso[0];
                    paape.innerHTML = "Apellido: "+ingreso[1];
                    pafec.innerHTML = "Fecha de nacimiento: "+ingreso[2];
                    if( ingreso[3]== "F"){
                        pasex.innerHTML = "Sexo: Femenino";
                    }else{
                        pasex.innerHTML = "Sexo: Masculino";
                    }
                    patel.innerHTML = "Telefono: "+ingreso[4];
                    paesp.innerHTML = "Especialidad: "+ingreso[5];
                    pause.innerHTML = "Usuario: "+ingreso[6];
                    pacon.innerHTML = "Contraseña: "+ingreso[7];
                    seccion2.appendChild(panom);
                    seccion2.appendChild(paape);
                    seccion2.appendChild(pafec);
                    seccion2.appendChild(pasex);
                    seccion2.appendChild(patel);
                    seccion2.appendChild(paesp);
                    seccion2.appendChild(pause);
                    seccion2.appendChild(pacon);
                }
            );
        }
    ).catch(
        function(error){
            alert("Ha ocurrido algun error");
            console.log(error);
        }
    );
}




window.addEventListener("load", getParametros);