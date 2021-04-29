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

function cargarD(){
    const filedoc = document.getElementById("inputDoc");
    filedoc.addEventListener("change",function(e){
        let archivo = e.target.files[0];
        let lector = new FileReader();
        lector.readAsText(archivo);
        lector.addEventListener("load",function(e){
            let archivo = e.target.result;
            let lineas = archivo.replace(/\r/g, '').split("\n");
            let comas = lineas[0].split(",")
            let contenido = new Array();
            if(comas.length != 8){
                alert("el archivo no contiene la información necesaria");
                let formulario = document.getElementById("archivos1").reset();
            }else{
                for (var i = 1; i < lineas.length-1; i++){
                    let auxline = lineas[i].split(",");
                    contenido[i-1]=auxline;
                }
                data = {
                    usuarios: contenido,
                    tipo: "doc"
                }
                fetch("/administrador/", {
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
                            function(d){
                                alert("carga con éxito: Doctore - "+d)
                            }
                        )
                    }
                ).catch(
                    function(error){
                        alert("Ha ocurrido algun error");
                        console.log(error);
                    }
                );
            }
        })
    })
}

function cargarE(){
    const filedoc = document.getElementById("inputEnf");
    filedoc.addEventListener("change",function(e){
        let archivo = e.target.files[0];
        let lector = new FileReader();
        lector.readAsText(archivo);
        lector.addEventListener("load",function(e){
            let archivo = e.target.result;
            let lineas = archivo.replace(/\r/g, '').split("\n");
            let comas = lineas[0].split(",")
            let contenido = new Array();
            if(comas.length != 7){
                alert("el archivo no contiene la información necesaria");
                let formulario = document.getElementById("archivos2").reset();
            }else{
                for (var i = 1; i < lineas.length-1; i++){
                    let auxline = lineas[i].split(",");
                    contenido[i-1]=auxline;
                }
                data = {
                    usuarios: contenido,
                    tipo: "enf"
                }
                fetch("/administrador/", {
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
                            function(d){
                                alert("carga con éxito: Enfermería - "+d)
                            }
                        )
                    }
                ).catch(
                    function(error){
                        alert("Ha ocurrido algun error");
                        console.log(error);
                    }
                );
            }
        })
    })
}

function cargarM(){
    const filedoc = document.getElementById("inputMed");
    filedoc.addEventListener("change",function(e){
        let archivo = e.target.files[0];
        let lector = new FileReader();
        lector.readAsText(archivo);
        lector.addEventListener("load",function(e){
            let archivo = e.target.result;
            let lineas = archivo.replace(/\r/g, '').split("\n");
            let comas = lineas[0].split(",")
            let contenido = new Array();
            if(comas.length != 4){
                alert("el archivo no contiene la información necesaria");
                let formulario = document.getElementById("archivos4").reset();
            }else{
                for (var i = 1; i < lineas.length-1; i++){
                    let auxline = lineas[i].split(",");
                    contenido[i-1]=auxline;
                }
                data = {
                    usuarios: contenido,
                    tipo: "med"
                }
                fetch("/administrador/", {
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
                            function(d){
                                alert("carga con éxito: Medicamento - "+d)
                            }
                        )
                    }
                ).catch(
                    function(error){
                        alert("Ha ocurrido algun error");
                        console.log(error);
                    }
                );
            }
        })
    })
}

function cargarP(){
    const filedoc = document.getElementById("inputPac");
    filedoc.addEventListener("change",function(e){
        let archivo = e.target.files[0];
        let lector = new FileReader();
        lector.readAsText(archivo);
        lector.addEventListener("load",function(e){
            let archivo = e.target.result;
            let lineas = archivo.replace(/\r/g, '').split("\n");
            let comas = lineas[0].split(",")
            let contenido = new Array();
            if(comas.length != 7){
                alert("el archivo no contiene la información necesaria");
                let formulario = document.getElementById("archivos3").reset();
            }else{
                for (var i = 1; i < lineas.length-1; i++){
                    let auxline = lineas[i].split(",");
                    contenido[i-1]=auxline;
                }
                data = {
                    usuarios: contenido,
                    tipo: "pac"
                }
                fetch("/administrador/", {
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
                            function(d){
                                alert("carga con éxito: Paciente - "+d)
                            }
                        )
                    }
                ).catch(
                    function(error){
                        alert("Ha ocurrido algun error");
                        console.log(error);
                    }
                );
            }
        })
    })
}

window.addEventListener("load",cargarD);
window.addEventListener("load",cargarE);
window.addEventListener("load",cargarM);
window.addEventListener("load",cargarP);
