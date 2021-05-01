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
function imprimir(nombre,nombreR){
    const $elementoParaConvertir = document.getElementById(nombre); // <-- Aquí puedes elegir cualquier elemento del DOM
    html2pdf()
        .set({
            margin: 1,
            filename: nombreR,
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
                format: "a3",
                orientation: 'portrait' // landscape o portrait
            }
        })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err));
}
function eliminarD(identificador){
    let nombre = identificador.replace(/\r/g, '').split("+");
    peticionDel(nombre[0],"doc");
}
function eliminarE(identificador){
    let nombre = identificador.replace(/\r/g, '').split("+");
    peticionDel(nombre[0],"enf");
}
function eliminarP(identificador){
    let nombre = identificador.replace(/\r/g, '').split("+");
    peticionDel(nombre[0],"pac");
}
function eliminarM(identificador){
    let nombre = identificador.replace(/\r/g, '').split("+");
    peticionDel(nombre[0],"med");
}
function peticionDel(elem,tip){
        let data = {
        elemento: elem,
        accion: "del",
        tipo: tip
    }
    fetch("/administrador/tabs/", {
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
        window.location.href = ("/administrador/tabs/")
    ).catch(
        function(error){
            alert("Ha ocurrido algun error")
            console.log(error)
            alert(error)
        }
    );
}
