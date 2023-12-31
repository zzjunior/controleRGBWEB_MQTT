### projeto-IOT
# PROJETO FINAL DE IOT - INTERNET DAS COISAS
## Disciplina da ECT - UFRN
###### Professor Orivaldo

## Resumo do projeto
O intuito do projeto é criar um controlador RGB de uma ou várias leds de um microcontrolador ESP.

Para isso foi criado uma página web com um "Controle" de cores RGB, com tela de visualização.

 - À página reconhece os valores das cores graças a combinação do `HTML`, ``JAVA SCRITP``, onde é utilizada uma função dentro do arquivo [`enviando_dados.js`](https://github.com/zzjunior/controleRGBWEB_MQTT/blob/main/js/enviando_dados.js) onde são atualizadas as cores de acordo com os valores dos formulários ``HTML``.
###### atualizaCores
 ~~~~javascript
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
~~~~

 - Após isso é criada uma função ainda no arquivo [`enviando_dados.js`](https://github.com/zzjunior/controleRGBWEB_MQTT/blob/main/js/enviando_dados.js), para criar a conecxão com o servidor `MQTT` ler os dados das cores que são atualizadas na `atualizaCores` e gerar a mensagem que será enviada para o servidor `MQTT`.
 ######  Conexão com MQTT [`enviando_dados.js`](https://github.com/zzjunior/controleRGBWEB_MQTT/blob/main/js/enviando_dados.js)
 ~~~javascript
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
~~~
###### Gerando mensagem e enviando dados ao servidor MQTT [`enviando_dados.js`](https://github.com/zzjunior/controleRGBWEB_MQTT/blob/main/js/enviando_dados.js)
~~~javascript
document.getElementById('enviarCores').addEventListener('click', function () {
  var redValue = document.getElementById('redRange').value;
  var greenValue = document.getElementById('greenRange').value;
  var blueValue = document.getElementById('blueRange').value;

  var msg = `RGB:Vermelho: ${redValue}, Verde: ${greenValue}, Azul: ${blueValue}`;

  client.publish(publishTopic, msg, { qos: 0, retain: false });
~~~

 - Após enviadas as informações é gerado um alerta informando que as cores foram enviadas e para qual ``TÓPICO`` do ``MQTT``, também é gerado um log no ``Devtools`` com a mensagem enviada.
###### Alertas de envio no MQTT [`enviando_dados.js`](https://github.com/zzjunior/controleRGBWEB_MQTT/blob/main/js/enviando_dados.js)
~~~javascript
console.log('Cores enviadas:', msg);

  var alertEnvio = document.getElementById('alerta-de-envio');
  var efeitotime = alertEnvio.style.display || window.getComputedStyle(alertEnvio).display;
  alertEnvio.style.display = 'block';
  setTimeout(function () {
    alertEnvio.style.display = efeitotime;
  }, 2000);
~~~

 ##### Tela com DevTools e Alerta de envio
<img src="image-1.png" width="700"/>

##### MQTTX com mensagens no TÓPICO USADO
<img src="image-2.png" width="300"/>

# ESP32
### Códigos e configurações de Sicronização com à Página Web
> #### [Esp_32_Programa](https://github.com/zzjunior/controleRGBWEB_MQTT/blob/main/Esp_32_Programa/guia_ESP32-MICROPYTHON.md)
Foi utilizado um simulador Web do MQTT devido à ocorrer somente uma vez na semana, e todos os alunos do Grupo deste projeto terem outros compromissos, impossibilitando a ida a UFRN.


<details>
 <summary>Fontes base Utilizadas</summary>

 [Biblioteca MQTT.JS](https://www.hivemq.com/article/mqtt-client-library-encyclopedia-paho-js](https://github.com/mqttjs)/)

 [Bootstrap](https://getbootstrap.com/docs/5.3)

 [Java Script](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

 [W3 Schools - JS](https://www.w3schools.com/jsrEF/default.asp)

 [Repositório de IOT - Professor Orivaldo](https://github.com/orivaldosantana/ura_html_panel/blob/main/test_mqtt_js.html)

 [Micropython Doc](https://docs.micropython.org/en/latest/)

 [Wokwi](https://wokwi.com)
</details>
