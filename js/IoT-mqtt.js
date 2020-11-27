var clientId = "ws" + Math.random(); 
// Crea una instancia de cliente
var client = new Paho.MQTT.Client ("13.59.3.48", 9001, clientId);

// establecer controladores de devolución de llamada
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// conecta el cliente
client.connect ({onSuccess: onConnect});
Potenciometro = 0;

// llamado cuando el cliente se conecta
function onConnect () {
  // Una vez que se haya establecido la conexión, suscríbase y envíe un mensaje.
  console.log ("conectado MQTT-webSocket");
    client.subscribe("pot");
}

// llamado cuando el cliente pierde su conexión
function onConnectionLost (responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log ("conexion perdida:" + responseObject.errorMessage);
  }
}

// llamado cuando llega un mensaje
function onMessageArrived (message) {
  console.log (message.destinationName + ":" + message.payloadString);
    if(message.destinationName == 'pot')
{
       // document.getElementById("Valor").textContent = message.payloadString;
       Potenciometro = parseFloat(message.payloadString);
}
}