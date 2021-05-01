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
var nompos;
function getParametros(){
    let ruta = new String(window.location);
    const nombre = ruta.split("?");
    nompos = nombre[1];
    let data = {
        nombre: nombre[1]
    }
    console.log(data);
    fetch("/modificar-medicina/", {
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
                    document.getElementById("nombre").value = ingreso[0];
                    document.getElementById("precio").value = ingreso[1];
                    document.getElementById("descripcion").value = ingreso[2];
                    document.getElementById("cantidad").value = ingreso[3];
                    posicion = parseInt(ingreso[4]);
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

function actualizar(){
    let continuar = true
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;
    let cantidad = document.getElementById("cantidad").value;

    if(precio == null || precio.length == 0){
        alert("El campo de precio está vacío");
        continuar = false;
    }if(descripcion == null || descripcion.length == 0){
        continuar = false;
        alert("El campo de descripción está vacío");
    }if(cantidad == null || cantidad.length == 0){
        continuar = false;
        alert("El campo de cantidad está vacío")
    }if(nombre == null || nombre.length == 0){
        continuar = false;
        alert("El campo de nombre está vacío");
    }else if(nombre.length > 0){
        if(continuar == true){
            if(nombre == nompos){
                let infor = {
                    nombre: nombre,
                    precio: precio,
                    descripcion: descripcion,
                    cantidad: cantidad,
                    indice: posicion
                }
                senMod(infor);
            }
            else{
                comprobarMed(nombre,precio,descripcion,cantidad,posicion);
            }
            
        }
    }
    if(continuar == true){
        console.log("se enviaran los campos")
    }
}
function comprobarMed(nombre,precio,descripcion,cantidad,indice){
    let data = {
        nombre: nombre,
        basura: "b"
    }
    let informacion = {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        cantidad: cantidad,
        indice: indice
    }
    fetch("/modificar-medicina/", {
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
    })
    .then(
        function(respuesta){
            respuesta.text().then(
                function(da){
                    if(da =="existe"){
                        alert("Ya hay una medicina registrada con este nombre");
                    }
                    else{
                        senMod(informacion)
                    }
                }
            );
        }
    )
    .catch(
        function(error){
            alert("Error ocurrido!");
            console.log(error);
        }
    );
}
function senMod(inf){
    fetch("/modificar-medicina/",{
        method: "POST",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Request-With": "XMLHttpRequest"
        },
        body: JSON.stringify(inf),
        mode: "cors",
        cache: "default",
        credentials: "include"
    })
    .then(
        window.location.href = ("/administrador/tabs/")
    )
    .catch(
        function(error){
            alert("Ha ocurrido algun error");
            console.log(error);
        }
    );
}



window.addEventListener("load", getParametros);