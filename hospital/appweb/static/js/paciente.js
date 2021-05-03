function inicio(){
    let direccion = window.location.toString();
    let datos = direccion.split("?");
    indice = datos[1];
    usuario = datos[2];
    let enlace = document.createElement("a");
    let texto = document.createTextNode("Modificar Datos De Usuario: "+usuario);
    enlace.appendChild(texto);
    let seccion = document.getElementById("modpaci");
    enlace.setAttribute("href","/modificar/"+"?"+usuario+"?paci");
    enlace.style.color = "#666";
    enlace.style.fontSize= "25px";
    enlace.style.marginLeft = "30px";
    seccion.appendChild(enlace);
}

window.addEventListener("load", inicio);