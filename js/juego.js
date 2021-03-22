var canvas;
var contexto;
var fps = 30;

var canvasX = 500;
var canvasY = 500;

var tileX, tileY;

// variables relacionadas con el tablero
var tablero;
var filas = 100; // here
var columnas = 100;
var blanco = '#FFF';
var negro = '#000';

function createArray2D(numRows, numColumns) {
  var obj = new Array(numColumns);
  for(let y = 0; y < numColumns; y++)
    obj[y] = new Array(numRows);
  return obj;
}

// Agente o turmita
var Agente = function(x, y, estado) {
  this.x = x;
  this.y = y;
  this.estado = estado; // vivo = 1, muerto = 2
  this.estadoProx = this.estado; // Estado que tendrá en el siguiente ciclo

  this.vecinos = []; // Guardamos el listado de sus vecinos

  // Método que añade los vecinos del objeto actual
  this.addVecinos = function() {
    var xVecino;
    var yVecino;

    for(var i = -1; i < 2; i++)
      for(var j = -1; j < 2; j++) {
        xVecino = (this.x + j + columnas) % columnas;
        yVecino = (this.y + i + filas) % filas;

        // descartamos el agente actual (yo no puedo ser mi propio vecino)

        if(i != 0 || j != 0) {
          this.vecinos.push(tablero[yVecino][xVecino]);
        }
      }
  }

  this.dibujar = function() {
    var color;
    if(this.estado == 1) {
      color = blanco;
    } else {
      color = negro;
    }

    contexto.fillStyle = color;
    contexto.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
  }

  // cambiar de estado o mutar Leyes de Conway.
  this.nuevoCiclo = function() {
    var suma = 0;
    //  cantidad de vecinos vivos
    for(let i = 0; i < this.vecinos.length; i++)
      suma += this.vecinos[i].estado;

    // Normas
    this.estadoProx = this.estado; // Por defecto lo dejamos igual
    // MUERTE: tiene menos de 2 o más de 3
    if(suma < 2 || suma > 3)
      this.estadoProx = 0;

    // Vida/Reproducción: tiene exactamente 3 vecinos
    if(suma == 3)
      this.estadoProx = 1;
  }

  this.mutar = function() {
    this.estado = this.estadoProx;
  }
}

function initTablero(obj) {
  var estado;

  for(let y = 0; y < filas; y++)
    for(let x = 0; x < columnas; x++) {
      estado = Math.floor(Math.random() * 2);
      obj[y][x] = new Agente(x, y, estado);
    }

  for(let y = 0; y < filas; y++)
    for(let x = 0; x < columnas; x++) {
      obj[y][x].addVecinos();
    }
}


function init() {
  // Asociamos el canvas
  canvas = document.getElementById('canvas');
  contexto = canvas.getContext('2d');

  // Cambio de dimensiones del canvas
  canvas.width = canvasX;
  canvas.height = canvasY;

  // Cálculo del tamaño de los tiles
  tileX = Math.floor(canvasX / filas);
  tileY = Math.floor(canvasY / filas);

  // Creamos el tablero
  tablero = createArray2D(filas, columnas);

  initTablero(tablero);

  // Ejecutamos el bucle principal

  setInterval(function() {
    launch();
  }, 1000 / fps);
}

function dibujarTablero(obj) {
  // Dibuja los agentes
  for(let y = 0; y < filas; y++)
    for(let x = 0; x < columnas; x++) {
      obj[y][x].dibujar();
    }
  // Calcula el siguiente ciclo
  for(let y = 0; y < filas; y++)
    for(let x = 0; x < columnas; x++) {
      obj[y][x].nuevoCiclo();
    }

  // Aplica la mutación
  for(let y = 0; y < filas; y++)
    for(let x = 0; x < columnas; x++) {
      obj[y][x].mutar();
    }
}

function clearCanvas() {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
}


function launch() {
  clearCanvas();
  dibujarTablero(tablero);
}
