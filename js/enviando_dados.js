function atualizaCores() {
  var redValue = document.getElementById('redRange').value;
  var greenValue = document.getElementById('greenRange').value;
  var blueValue = document.getElementById('blueRange').value;

  var colorPreview = document.getElementById('colorPreview');
  colorPreview.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

document.getElementById('redRange').addEventListener('input', atualizaCores);
document.getElementById('greenRange').addEventListener('input', atualizaCores);
document.getElementById('blueRange').addEventListener('input', atualizaCores);
atualizaCores();

// Depois envia os dados para o servidor e tópico MQTT
// conexão mqtt lar ect

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const host = 'wss://mqtt.ect.ufrn.br:8083/mqtt'
const publishTopic = 'teste';

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  username: "mqtt",
  password: "lar_mqtt",
  will: {
    topic: 'teste',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  }
};

console.log('Connecting mqtt client');
const client = mqtt.connect(host, options);

client.on('error', err => {
  console.log('Connection error: ', err);
  client.end();
});

client.on('reconnect', () => {
  console.log('Reconnecting...');
});

client.on('connect', function () {
  console.log('Conectado ao servidor MQTT');
});

document.getElementById('enviarCores').addEventListener('click', function () {
  var redValue = document.getElementById('redRange').value;
  var greenValue = document.getElementById('greenRange').value;
  var blueValue = document.getElementById('blueRange').value;

  var msg = `RGB:Vermelho: ${redValue}, Verde: ${greenValue}, Azul: ${blueValue}`;

  client.publish(publishTopic, msg, { qos: 0, retain: false });

  console.log('Cores enviadas:', msg);

  var alertEnvio = document.getElementById('alerta-de-envio');
  var efeitotime = alertEnvio.style.display || window.getComputedStyle(alertEnvio).display;
  alertEnvio.style.display = 'block';
  setTimeout(function () {
    alertEnvio.style.display = efeitotime;
  }, 2000);
});