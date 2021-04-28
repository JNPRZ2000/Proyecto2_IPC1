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
function registrar(){
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
    }if(usuario == null || usuario.length == 0){
        continuar = false;
        alert("Rellene el campo de usuario");
    }else if(usuario.length > 0){
        if(usuario =="admin"){
            alert("usuario no valido");
            continuar  = false;
        }else if(continuar == true){
            comprobarUsuario("usuario",nombre,apellido,fecha,genero,telefono,contraseña);
        }
    }if(contraseña == null || contraseña.length < 8){
        continuar = false
        alert("Ingrese una contraseña valida (Al menos 8 caracteres)");
    }
    if(continuar == true){
        console.log("se enviaran los campos")
    }

}
function comprobarUsuario(identificador,nombre,apellido,fecha,genero,telefono,contraseña){
    let usuario = document.getElementById(identificador).value;
    let data = {
        usuario: usuario,
    }
    let informacion = {
        nombre: nombre,
        apellido: apellido,
        fecha: fecha,
        genero: genero,
        telefono: telefono,
        usuario: usuario,
        contraseña: contraseña
    }
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
                        alert("este nombre de usuario no está disponible");
                    }
                    else{
                        fetch("/registro/",{
                            method: "POST",
                            headers: {
                                "X-CSRFToken": getCookie("csrftoken"),
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "X-Request-With": "XMLHttpRequest"
                            },
                            body: JSON.stringify(informacion),
                            mode: "cors",
                            cache: "default",
                            credentials: "include"
                        })
                        .then(
                            window.location.href = ("/login/")
                        )
                        .catch(
                            function(error){
                                alert("Ha ocurrido algun error");
                                console.log(error);
                            }
                        );
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