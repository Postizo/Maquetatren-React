var express = require('express');
var cors = require('cors');
var app = express();
const https = require('https')
const fs = require('fs')
const port = 5001;

var path = require('path');
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var led0 = new Gpio(4, 'out'); //use GPIO pin 4 as output
var led1 = new Gpio(6, 'out'); //use GPIO pin 4 as output

var pushButton0 = new Gpio(17, 'in', 'both'); //use GPIO pin 24 as input, and 'both' button presses, and releases should be handled
var pushButton1 = new Gpio(1, 'in', 'both'); //use GPIO pin 24 as input, and 'both' button presses, and releases should be handled

var conectado = 0; //Variable que guarda los socket abiertos (clientes)
var elementos = 12; // Numero de elemenos que controlamos
var Arrayciudades = []; // Array de estados guardaremos un id y un estadoled)
var ledactuador = led0; // Led que se ejecutara
var botonactuador = pushButton0; //Boton que se pulsara
var NombreElementos;



const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, 'security/certificate.key')),
    cert: fs.readFileSync(path.resolve(__dirname, 'security/certificate.crt.txt'))
}

//Inicializacion del Socket
const server = https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log('server running at ' + port);		 
		ini();
    })

var io = require('socket.io')(server);

function leeconfig()
{
let archivo = fs.readFileSync(path.resolve(__dirname, 'Config.txt'), 'utf-8');
NombreElementos = archivo.split('\n');
//console.log(NombreElementos.toString());
}

//Inicializamos un array de estados 
function ini(){
	leeconfig();
	for (i= 0; i < elementos; i++) {
		//Objeto
		var Ciudad = {
		id: i,
		estadoled: false,
		Nombre: NombreElementos[i].replace('\r', '')
		}
		Arrayciudades.push(Ciudad);
	}	
}

// Guarda el estado en el array de estados
function Guadaestado(id, estado){
	const found = Arrayciudades.find(element => element.id  == id);
	found.estadoled = estado;
	console.log(Arrayciudades); 
	return found;
}

// Consultamos en el Array de estados y nos devuelve uno por el id
function Recuperarestado(id){
	const found = Arrayciudades.find(element => element.id  == id); 
	return found;
}

//Funcion que elige el led y el boton que va a funcionar GPIO
function eligeled(id){
	switch (id) {
	  case 0: 
		ledactuador = led0;
		botonactuador = pushButton0;		
		break;
	  case 1: 
		ledactuador = led1;
		botonactuador = pushButton1;
		break; 
	  case 2:
		//ledactuador = led2;
		//botonactuador = pushButton2;
		break;
	  case 3:
		//ledactuador = led3;
		//botonactuador = pushButton3;
		break;
	  case 4:
		//ledactuador = led4;
		//botonactuador = pushButton4;
		break;
	  default:
	
	}
}

app.use('/static', express.static(__dirname + '/build/static'));
app.use('/build', express.static(__dirname + '/build'));

app.use(cors());

app.get('/',function(req,res){
 res.sendFile(__dirname + '/build/index.html');
});

//API QUE DEVUELVE EL ESTADO DE LOS LED
app.get('/estadoled', function (req, res) {
  res.send(Arrayciudades);
});





//Metodo de Conexion (SE EJECUTA CUNADO ALGUIEN SE CONECTA)
io.on('connection', function(socket) {
   conectado++;
   console.log('Alguien se ha conectado con Sockets; Eres el conectado numero:' + conectado);
	//Funcion que se ejecuta cada vez que se manda algo por el socket
	socket.on('Seccion1', function(data) {
		var lednumerico =  data.estadoled ? 1 : 0;				
		eligeled(Number(data.id));
		if (lednumerico != ledactuador.readSync()) ledactuador.writeSync(lednumerico); //turn LED on or off
		Guadaestado(data.id, data.estadoled);
		io.sockets.emit('Seccion1', data); // Envia el dato que le ha llegadoa todos para que este sincronizado
  });

});

//PENDIENTE DEL BOTON FISICO
pushButton0.watch(function (err, value) { //Watch for hardware interrupts on pushButton
    const idfisico = 0;
	eligeled(Number(idfisico));
	if (err) { //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    if (value == 0){
	var ciudad =  Recuperarestado(idfisico); //recuperamos el estado del led con el Json
 	var lednumerico = (ciudad.estadoled == 0)? 1 : 0; // Le cambiamos el estado del led y lo pasamos  a numerico
	if (lednumerico != ledactuador.readSync()) ledactuador.writeSync(lednumerico); //turn LED on or off	  
	ciudad = Guadaestado(idfisico, !ciudad.estadoled); //Guardamos el estado de la ciudad con el valor cambiado
	io.sockets.emit('Seccion1', ciudad); // MANDAS EL ESTADO AL SOCKET
    }
  });

