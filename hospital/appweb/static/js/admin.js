var cajadatos;
function iniciar(){
    cajadatos = document.getElementById("cajadatos")
    var archivos = document.getElementById("inputDoc");
    archivos.addEventListener("change",procesar);
}
function procesar(evento){
    var archivos = evento.target.files;
    var archivo = archivos[0];
    var lector = new FileReader();
    lector.addEventListener("load", mostrar);
    lector.readAsText(archivo);
}
function mostrar(evento){//7 campos, n-1 filas
    var resultado = evento.target.result;
    let filas = resultado.split("\n");
    cajadatos.innerHTML = resultado;
    let filas
    for(let i = 1; i<filas.length;i++){
        console.log(i);
        console.log(filas[i]);
    }
}
window.addEventListener("load",iniciar);