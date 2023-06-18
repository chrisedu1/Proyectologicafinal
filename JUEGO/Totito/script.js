let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let nuevojuegoBtn = document.getElementById("nuevo-juego");
let reiniciartBtn = document.getElementById("reiniciar");
let msgRef = document.getElementById("message");
//Formación del patron ganador
let winningPattern = [ 
  [0, 1, 2],
  [0, 3, 6], 
  [2, 5, 8], 
  [6, 7, 8], 
  [3, 4, 5], 
  [1, 4, 7], 
  [0, 4, 8], 
  [2, 4, 6],
];

//El Jugador ´X´ juega primero
let xTurn = true;
let count = 0;

//Deshabilitar todos los botones
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //Habilitar ventana emergente
    popupRef.classList.remove("hide");
};

//Habilitar todos los botones (Para juego nuevo y reinicio)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //Deshabilitar ventana emergente
  popupRef.classList.add("hide");
};

//Esta función se ejecuta cuando un jugador gana 
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#129302; <br> 'X' Ganador, Sigue asi, vas muy bien!";
    } else {
        msgRef.innerHTML = "&#129302; <br> 'O' Ganador, Sigue asi, vas muy bien!";
    }
};

//Función para dibujar
const drawFunction = () => {
    disableButtons();
    msgRef.innerHtml = " &#129302; <br> It's a Draw";
};

//Juego Nuevo
nuevojuegoBtn.addEventListener("click", () => {
   count = 0;
   enableButtons(); 
});
reiniciartBtn.addEventListener("click", () => {
   count = 0;
   enableButtons();
});

//Ganar Lógica
const winChecker = () => {
    //Recorre todos los patrones de ganancias
    for(let i of winningPattern) {
       let[element1, element2, element3 ] = [
        btnRef[i[0]].innerText, 
        btnRef[i[1]].innerText, 
        btnRef[i[2]].innerText, 
        ];
        //Comprobar si los elementos están llenos
        //Si 3 elementos vacíos son iguales darían ganar 
        if(element1 != "" && element2 != "" & element3 != ""){
           if(element1 == element2 && element2 == element3){
              //Si los 3 botones tienen los mismos valores, pase el valor a winFunction
              winFunction(element1);
           } 
        }
    }
};

//Mostrar X/O al hacer click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if(xTurn) {
            xTurn = false;
            //Mostrar X
            element.innerText = "X";
            element.disabled = true;
        } else {
          xTurn = true;
          //Mostrar Y
          element.innerText = "O";
          element.disabled = true;
        }
        //Incrementar el conteo en cada click
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        //Compruebe si gana al dar click
        winChecker();
    });
});
//Habilitar botones y deshabilitar ventanas emergentes al cargar la página
window.onload = enableButtons;