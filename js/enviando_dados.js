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

function publishCoresJSON() {
  var redValue = document.getElementById('redRange').value;
  var greenValue = document.getElementById('greenRange').value;
  var blueValue = document.getElementById('blueRange').value;
// criando objeto JSON
  var colorData = {
    red: redValue,
    green: greenValue,
    blue: blueValue
  };

  //dados MQTT var client = new Paho.MQTT.Client("host", porta, "clientId");
// Conectando com o MQTT e enviando os dados em formato
  client.connect({
    onSuccess: function () {
      var topic = "CorRGBJSON";
      var message = JSON.stringify(colorData);
      var qos = 0;

      var message = new Paho.MQTT.Message(message);
      message.destinationName = topic;
      message.qos = qos;

      client.send(message);

      // agente pode manter ativo sempre atualizando client.disconnect();
    },
    onFailure: function (message) {
      console.log("Erro ao conectar: " + message.errorMessage);
    }
  });
}
