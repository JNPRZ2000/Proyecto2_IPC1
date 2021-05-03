var usernom;
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
function loguear(){
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;
    if(usuario == "admin" && contrasena == "1234"){
        window.location.href = "/administrador/"
    }else{
        solicitudBuscar(usuario,contrasena)
    }
}
function solicitudBuscar(usuario,contrasena){
    usernom = usuario;
    data = {
        usuario: usuario,
        contrasena: contrasena
    }
    fetch("/login/", {
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
                function(dat){
                    console.log(dat)
                    let lis = dat.replace(/\r/g,'').split("-")
                    console.log(lis)
                    if(lis[0] == "noexiste"){
                        alert("verifique sus credenciales")
                    }else{
                        renderizarVista(lis[0],lis[1])
                    }
                }
            )
        }
    )
    .catch(
        function(error){
            alert("Error ocurrido!")
            console.log(error)
        }
    );
}
function renderizarVista(tipo,indice){
    if (tipo == "doc"){
        window.location.href = "/doctor/"+"?"+indice+"?"+usernom
    }
    if (tipo == "enf"){
        window.location.href = "/enfermeria/"+"?"+indice+"?"+usernom
    }
    if (tipo == "pac"){
        window.location.href = "/paciente/"+"?"+indice+"?"+usernom
    }
}