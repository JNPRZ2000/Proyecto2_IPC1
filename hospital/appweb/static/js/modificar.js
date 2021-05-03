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
var tipoUs;
var anterior;
var usu;
var ancestro;
function getParametros(){
    let ruta = new String(window.location);
    const usuario = ruta.split("?");
    let tipo;
    ancestro = usuario[2];
    if(usuario[2]=="enfe" || usuario[2] == "enf"){
        tipo ="enf"
    }
    if(usuario[2] == "paci" || usuario[2] =="pac"){
        tipo = "pac"
    }
    anterior = usuario[3];
    let data = {
        usuario: usuario[1],
        tipo: tipo
    }
    tipoUs = tipo;
    console.log(data);
    fetch("/modificar/", {
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
                    let ingreso = da.split("*")
                    document.getElementById("nombre").value = ingreso[0];
                    document.getElementById("apellido").value = ingreso[1];
                    let fe = ingreso[2].toString()
                    let fe1;
                    if (fe.includes("/") == false){
                        fe1 = fe.split("-")
                    }else{
                        fe1 = fe.split("/")
                    }
                    let fe2
                    if (fe1[0].length == 2 ){
                        fe2 = new String(fe1[2]+"-"+fe1[1]+"-"+fe1[0])
                    }
                    else{
                        fe2 = new String(fe1[0]+"-"+fe1[1]+"-"+fe1[2])
                    }
                    document.getElementById("nacimiento").value = fe2;
                    if (ingreso[3]=="F"){
                        document.getElementById("sexo").selectedIndex = 1
                    }
                    else{
                        document.getElementById("sexo").selectedIndex = 2
                    }
                    document.getElementById("telefono").value = ingreso[6];
                    document.getElementById("usuario").value = ingreso[4];
                    document.getElementById("contrasena").value = ingreso[5];
                    posicion = parseInt(ingreso[7]);
                    posUs = ingreso[4];
                }
            );
        }
    ).catch(
        function(error){
            console.log(error);
            alert("Ha ocurrido algun error1");
            
        }
    );
}

function actualizar(){
    let continuar = true
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let fecha = document.getElementById("nacimiento").value;
    let genero = document.getElementById("sexo").value;
    let telefono = document.getElementById("telefono").value;
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contrasena").value;

    if(nombre == null|| nombre.length ==0){
        alert("No ha ingresado su nombre");
        continuar = false;
    }if(apellido == null || apellido.length == 0){
        alert("No ha ingresado su apellido");
        continuar = false;
    }if( fecha.length == 0){
        alert("No ha ingresado una fecha valida");
        continuar = false;
    }if(genero == "nulo"){
        continuar = false;
        alert("Seleccione su sexo");
    }if(telefono.length>0 && telefono.length!=8){
        continuar = false;
        alert("Ingrese un numero valido (8 Números)\nSi no desea ingresar su número telefónico,"+
        "\nborre los datos de este campo");
    }if(contraseña == null || contraseña.length < 8){
        continuar = false
        alert("Ingrese una contraseña valida (Al menos 8 caracteres)");
    }if(usuario == null || usuario.length == 0){
        continuar = false;
        alert("Rellene el campo de usuario");
    }else if(usuario.length > 0){
        if(usuario =="admin"){
            alert("usuario no valido");
            continuar  = false;
        }else if(continuar == true){
            if(usuario == posUs){
                let infor = {
                    nombre: nombre,
                    apellido: apellido,
                    fecha: fecha,
                    sexo: sexo,
                    telefono: telefono,
                    usuario: usuario,
                    contrasena: contraseña,
                    indice: posicion,
                    tipo: tipoUs
                }
                usu = usuario;
                
                senMod(infor);
            }
            else{
                comprobarUsuario("usuario",nombre,apellido,fecha,genero,telefono,contraseña,posicion);
            }
            
        }
    }
}
function comprobarUsuario(identificador,nombre,apellido,fecha,genero,telefono,contraseña,indice){
    let usuario = document.getElementById(identificador).value;
    let data = {
        usuario: usuario,
    }
    let informacion = {
        nombre: nombre,
        apellido: apellido,
        fecha: fecha,
        sexo: genero,
        telefono: telefono,
        usuario: usuario,
        contrasena: contraseña,
        indice: indice,
        tipo: tipoUs
    }
    usu = usuario;
    fetch("/registro/", {
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
                    if(da =="oknt"){
                        alert("este nombre de usuario no está disponible")
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
            console.log(error)
            alert("Error ocurrido!")
        }
    );
}
function senMod(inf){
    fetch("/modificar/",{
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
       redireccionar()
    )
    .catch(
        function(error){
            console.log(error)
            alert("Ha ocurrido algun error")
            
        }
    )
}
function redireccionar(){
    if(ancestro == "enfe"){
        window.location.href = ("/doctor/"+"?"+posicion+"?"+usu)
    }else if(ancestro == "paci"){
        window.location.href = ("/paciente/"+"?"+posicion+"?"+usu)
    }else{
        window.location.href = ("/administrador/tabs/")
    }
}

window.addEventListener("load",getParametros);