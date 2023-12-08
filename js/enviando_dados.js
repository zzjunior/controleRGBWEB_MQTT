//Essa função pessoal vai fazer o envio dos dados das cores lá da página web pro mqtt,
// mas antes vai tranformar os dados pra um objeto JSON pra gente conseguir ler com 
//qualquer linguagem, como ainda não decidimos se vamos usar o ESP32 ou o 28...

// Primeiro recebe e atualiza os dados de de acordo com os botões
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

//function publishCoresJSON() {
 // var redValue = document.getElementById('redRange').value;
  //var greenValue = document.getElementById('greenRange').value;
  //var blueValue = document.getElementById('blueRange').value;
// criando objeto JSON
  // var colorData = {
    // red: redValue,
    // green: greenValue,
    // blue: blueValue
  //  };
//}

// conexão mqtt lar ect

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
//const host = 'wss://broker.emqx.io:8084/mqtt'
const host = 'wss://mqtt.ect.ufrn.br:8083/mqtt'
const publishTopic = 'teste'
var ledIsOn = false
var msg = "Cores da página web"+document.getElementById('redRange').value+" = Vermelhor";
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
}
console.log('Connecting mqtt client')
const client = mqtt.connect(host, options)
client.on('error', err => {
  console.log('Connection error: ', err)
  client.end()
})
client.on('reconnect', () => {
  console.log('Reconnecting...')
})

client.on('connect', function () {
  console.log('Conectado ao servidor MQTT')
})
