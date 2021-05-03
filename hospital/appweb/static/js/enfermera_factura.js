function darFecha(){
    document.getElementById("fecha").valueAsDate = new Date();
}
function volver(){
    window.history.back();
}
function imprimir(){
    let paciente = document.getElementById("paciente").value;
    let doctor = document.getElementById("doctor").value;
    let consulta = document.getElementById("consulta").value;
    let continuar = true;
    if (paciente == null || paciente.length == 0){
        alert("No ha ingresado un paciente");
        continuar = false;
    }if(doctor == "nulo"){
        alert("No ha seleccionado un doctor");
        continuar = false;
    }if(consulta == null || consulta.length == 0){
        alert("No ha ingresado el monto de la consulta");
        continuar = false;
    }
    if(continuar == true){
        const $elementoParaConvertir = document.getElementById("seccion2"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0.2,
                filename: "factura.pdf",
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
                    format: "a4",
                    orientation: 'portrait' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    }
}

window.addEventListener('load', darFecha);