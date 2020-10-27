function abrir(event){
    let archivo = event.target.files[0];
    if(archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            var lines = contenido.split('\n');
            document.getElementById('contenido').innerText = contenido;
            document.getElementById('resultado').innerText = "Revisa la consola";
            for (i = 0; i<lines.length; i++){
              linea = lines[i].split(" ")
              console.log(linea)
              comprobar(linea)
            }
        }
        reader.readAsText(archivo);
    }else{
        document.getElementById("mensaje").innerText = "No ha seleccionado archivo"
    } 
}

window.addEventListener("load",()=>{
    document.getElementById("loader").addEventListener("change",abrir)    
})


/********************************************************************************************************* */
// LISTAS

function Node (clase, value) {
    this.clase = clase
    this.value = value
    this.next = null
  }
  
  function LinkedList() {
    this.head = null
  }

  Node.prototype.getValue = function(){
    return this.value;
  }

  Node.prototype.getClass = function(){
    return this.clase;
  }

  Node.prototype.getNext = function(){
      return this.next;
  }
  
  LinkedList.prototype.append = function(clase,value, current = this.head){
    if(this.head === null){
      return this.head = new Node(clase,value)
    }
    if(current.next === null){
      return current.next = new Node(clase,value)
    }
    this.append(clase,value, current.next)
  }
  
  LinkedList.prototype.prepend = function(clase,value){
    if(this.head === null){
      return this.head = new Node(clase,value)
    }
    let newNode = new Node(clase,value)
    newNode.next = this.head
    this.head = newNode
  }
  
  LinkedList.prototype.removeNode = function (value, current = this.head) {
    if(this.head === null){ // no head
      return false
    }
  
    if (this.head.value === value){
      return this.head = this.head.next
    }
  
    if(current.next !== null){
      if(current.next.value === value){
        return current.next = current.next.next
      }
      this.removeNode(value, current.next)
    }
    return false // no match found
  }
  
  LinkedList.prototype.findNode = function (value, current = this.head){
    if(this.head === null) {
      return false
    }
  
    if (current !== null) {
      if (current.value === value){
        return true
      } else {
        return this.findNode(value, current.next)
      }
    }
    return false
  }
  
  LinkedList.prototype.peekNode = function (value) {
    if(this.head === null) {
      return false
    }
    return this.head
  }
  
  LinkedList.prototype.length = function (current = this.head, acum = 1) {
    if(this.head === null){
      return 0
    }
    if (current.next !== null){
      return this.length(current.next, acum = acum + 1)
    }
    return acum
  }

  LinkedList.prototype.convertirEnArray = function(node){
    let listaNueva
    while(node=!null){
      listaNueva.push(node.getValue())
      node = node.getNext();
    }
    return listaNueva
  }
  
/*********************************************************************************************
 * CREACIÓN DE PILAS
 */

class Stack {
  constructor(){
    this.stack = [];
  }
  
  push(element){
    this.stack.push(element);
    return this.stack;
  }

  pop(){
    return this.stack.pop();
  }

  peek(){
    return this.stack[this.stack.length - 1];
  }

  size(){
    return this.stack.length;
  }
  isEmpty(){
    if(this.stack.length == 0){
      return true;
    }
  }
  print(){
    console.log(this.stack);
  }
}

/**********************************************************************************************
  * COMPROBAR SI ES UN INT O UN FLOAT
 */

function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}


/***************************************************************************************************
 * CONVERTIR LINEA DE TEXTO EN LISTA
 */
//var r = ["int", "num2", "=",'"', "aguacate y lechuga",'"', ";"]

var tipo = ["char", "int", "float", "bit", "boolean"];
var variable = new RegExp("^[0-9a-zA-Z]+$");
var separador = [",", ";", '"'];
var cadena = new RegExp("[A-Za-z0-9]");
var operador = ["=", "-", "+", "*", "/", ">", "<", "&&", "||"];

function convertirLista(r){
  var lista = new LinkedList();
  for(i = 0; i < r.length; i++){
    if(tipo.includes(r[i])){
      lista.append("Tipo", r[i]);
      console.log(Object.values(lista));
    }
    else if(variable.test(r[i])){
      lista.append("Variable", r[i]);
    }
    else if(separador.includes(r[i])){
      lista.append("Separador", r[i]);
    }
    else if(cadena.test(r[i])){
      lista.append("Cadena", r[i]);
    }
    else if(r[i].isInt || r[i].isFloat){
      lista.append("Constante", r[i]);
    }
    else if(operador.includes(r[i])){
      lista.append("Operador", r[i])
    }
  }
  return lista;
}
//console.log(convertirLista(r));

/******************************************************************************************************************
 * VERIFICAR PARENTESIS
 */

function verificarParentesis(r){
  const pila = new Stack();
  let balanceados = true;
  var i = 0;
  while(i < r.length && balanceados){
    let simbolo = r[i];
    if (simbolo == "("){
      pila.push(simbolo);
    }
    else{
      if(pila.isEmpty()){
        balanceados = false;
      }
      else{
        pila.pop();
      }
    }
    i++;
  }
  if(balanceados && pila.isEmpty()){
    return true;
  }
  else{
    return false;
  }
}

/******************************************************************************************************************
 * ESTADOS
 

function estadoS0(lista){
  let aux = new Node();
  let valor, clase;
  aux = lista.peekNode();
  let long = lista.length();
  for(i=0; i<long; i++){
    clase = aux.getClass()
    switch (clase){
      case "Tipo":
        aux = aux.getNext();
        if(variable.includes(aux.getValue())){
          aux.getNext();
          if(separador.includes(aux.getValue()) && aux.getValue()==";"){
            if(aux.next==null){
              break;
            }else{
              console.log("Error, luego de ; no deben haber caracteres")
            }
          }else if(separador.includes(aux.getValue()) && aux.getValue()==","){
            estadoS0()
          }
        }
    }
  }
  return valor
}
*/


function estadoS0(lista){
  let aux = new Node();
  let valor;
  aux = lista.peekNode();
  let long = lista.length();
  for(i=0; i<long; i++){
    valor = aux.getValue();
    aux = aux.getNext(); 
  }
  return valor
}

 /***************************************************************************************************************** 
 * COMPROBAR QUE LA LINEA ESTÉ BIEN ESCRITA
*/

function comprobar(listaC){
  var listaComp = new LinkedList();
  listaComp = convertirLista(listaC);
  let aux = new Node();
  aux = listaComp.peekNode();
  aux = aux.getNext()
  aux = aux.getNext()
  return convertirEnArray(aux)
  //return estadoS0(listaComp); 
  //console.log(listaComp)
  console.log(estadoS0(listaComp));
}

