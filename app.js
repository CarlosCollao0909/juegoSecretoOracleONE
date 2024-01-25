let numeroSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;



// asignar texto a elementos HTML de forma dinámica con una función
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function numeroIntentos(){
    if(intentos > 3){
        asignarTextoElemento('h1', 'Se acabaron los intentos 😢');
        asignarTextoElemento('p', `El número secreto era ${numeroSecreto}`);
        //habilitar el boton nuevo juego
        document.getElementById('reiniciar').removeAttribute('disabled');
        console.log(intentos + ' intentos');
        return;
    }
}

function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    if(numeroUsuario === numeroSecreto){
        asignarTextoElemento('p', `Felicidades, adivinaste el número en ${intentos} ${(intentos === 1) ? ' intento ' : ' intentos '} 😎`);
        //habilitar el boton nuevo juego
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if(numeroUsuario < numeroSecreto){
            asignarTextoElemento('p', 'Intenta un número mayor');
        }
        else{
            asignarTextoElemento('p', 'Intenta un número menor');
        }
        intentos++;
        numeroIntentos();
        limpiarInput();
    }
    return;
}

function limpiarInput(){
    document.querySelector('#valorUsuario').value = '';
    return;
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(numerosSorteados);

    if(numerosSorteados.length == numeroMaximo){
        asignarTextoElemento('h1', 'Fin del Juego')
        asignarTextoElemento('p', 'Se sortearon todos los números posibles 🤯');
    }
    else{
        //validar que no se repita el número
        if(numerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }
        else{
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número entre 1 y ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    return;
}

function reiniciarJuego(){
    //limpiar input
    limpiarInput();
    //indicar el intervalo de numeros
    //generar el numero aleatorio
    //resetear los intentos
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    return;
}

condicionesIniciales();