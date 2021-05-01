var indice
var usuario
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
function inicio(){
    document.getElementById("fecha").valueAsDate = new Date();
    let direccion = window.location.toString();
    let datos = direccion.split("?");
    indice = datos[1];
    usuario = datos[2];
    let enlace = document.createElement("a");
    let texto = document.createTextNode("Modificar Datos De Usuario: "+usuario);
    enlace.appendChild(texto);
    let seccion = document.getElementById("verdoctor");
    enlace.setAttribute("href","/modificar-doctor/"+"?"+usuario+"?doc");
    enlace.style.color = "#666";
    enlace.style.fontSize= "25px";
    enlace.style.marginLeft = "30px";
    seccion.appendChild(enlace);
}
function generarReceta(){
    let continuar = true;
    let paciente = document.getElementById("paciente").value;
    let padecimiento = (document.getElementById("padecimiento").value).toLowerCase();
    let descripcion = document.getElementById("descripcion").value;
    if (paciente == null || paciente.length == 0){
        alert("Es obligatorio ingresar el nombre del paciente")
        continuar = false;
    }if (padecimiento == null || padecimiento.length == 0){
        alert("Es obligatorio ingresar el padecimiento")
        continuar = false;
    }if (descripcion == null || descripcion.length == 0){
        alert("Es obligatorio ingresar una descripción")
        continuar = false;
    }
    if (continuar == true){
        imprimir();
        guardarReceta(padecimiento)
    }
}
function imprimir(){
    const $elementoParaConvertir = document.getElementById("seccion1"); // <-- Aquí puedes elegir cualquier elemento del DOM
    html2pdf()
        .set({
            margin: 0.2,
            filename: "receta.pdf",
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3, // A mayor escala, mejores gráficos, pero más peso
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a5",
                orientation: 'portrait' // landscape o portrait
            }
        })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err));
}

function guardarReceta(padecimiento){
    let data = {
        indice: indice,
        padecimiento: padecimiento
    }
    fetch("/doctor/", {
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
                }
            )
        }
    )
    .catch(
        function(error){
            error.text().then(
                function(e){
                    console.log(e)
                }
            )
        }
    )
}
window.addEventListener("load", inicio);