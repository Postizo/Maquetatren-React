var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var led = new Gpio(4, 'out'); //use GPIO pin 18 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 24 as input, and 'both' button presses, and releases should be handled



var conectado = 0;
var estadoled = 0
var Arrayciudades = [];


app.use(express.static('public'));

app.get('/',function(req,res){
 res.sendFile(path.join('index.html'));
});


//API QUE DEVUELVE EL ESTADO DE LOS LED
app.get('/estadoled', function (req, res) {
  res.send(respuesta);
});

//Inicializacion del Socket
server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});


//Metodo de Conexion (SE EJECUTA CUNADO ALGUIEN SE CONECTA)
io.on('connection', function(socket) {
   conectado++;
   console.log('Alguien se ha conectado con Sockets; Eres el conectado numero:' + conectado);
	socket.on('Seccion1', function(data) {
		console.log('A traves del socket abierto por el canal: Seccion1 Me esta llegando el valor: ' + data );  
		estadoled 	=  data ? 1 : 0;
		console.log('var estado led ' + estadoled);
		console.log('estado led ' + led.readSync());		
		if (estadoled != led.readSync()) { //only change LED if status has changed
		console.log('ACCION');
		led.writeSync(estadoled); //turn LED on or off
		}
		io.sockets.emit('Seccion1', data); // Envia el dato que le ha llegadoa todos para que este sincronizado
  });

});

	  //PENDIENTE DEL BOTON FISICO
pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
    if (err) { //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    if (value == 0){
	  estadoled = (estadoled == 0)? 1 : 0;
      if (estadoled != led.readSync()) { //only change LED if status has changed
		console.log('ACCION');
		led.writeSync(estadoled); //turn LED on or off
		}
	  io.sockets.emit('Seccion1', estadoled); // MANDAS EL ESTADO AL SOCKET
      console.log("por fisico he pulsado y estoy:" + estadoled);
    }
    //console.log(estadoanterior);
  });






// INICIALIZACION DE LOS LED (GPIO)
process.on('SIGINT', function () { //on ctrl+c
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
});
