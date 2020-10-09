function abrir(event){
    let archivo = event.target.files[0];
    if(archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            document.getElementById('contenido').innerText = contenido;
            document.getElementById('resultado').innerText = "Todo malo :(";
        }
        reader.readAsText(archivo);
    }else{
        document.getElementById("mensaje").innerText = "No ha seleccionado archivo"
    }
}

window.addEventListener("load",()=>{
    document.getElementById("loader").addEventListener("change",abrir)    
})

