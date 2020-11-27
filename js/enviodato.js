var getData = function (){
var SetPoint = document.getElementById('SetPoint').value;
message = new Paho.MQTT.Message(SetPoint);
message.destinationName = "setPoin";
client.send(message);
        console.log(SetPoint);
}



