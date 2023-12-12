### projeto-IOT
# PROJETO FINAL DE IOT - INTERNET DAS COISAS
## Disciplina da ECT - UFRN
###### Professor Orivaldo

O intuito do projeto é criar um controlador RGB de uma ou várias leds de um microcontrolador ESP.

Para isso foi criado uma página web com um modele de "Controle" de cores RGB, com tela de visualização.

 - À página reconhece ops valores das cores graças a combinação do HTML, JAVA SCRITP, onde é utilizada uma função dentro do arquivo "enviando_dados.js" onde são atualizadas as cores de acordo com os valores dos formulários HTML.

 - Após isso é criada uma função dentro atualização de cores, para ler estes dados e gerar a mensagem que será enviada para o servidor MQTT.

 - Após enviadas as informações é gerado um alerta informando que as cores foram enviadas e para qual TÓPICO do MQTT, também é gerado um log no Devtools com a mensagem enviada.

 ##### Tela com DevTools e Alerta de envio
<img src="image-1.png" width="700"/>

##### MQTTX com mensagens no TÓPICO USADO
<img src="image-2.png" width="300"/>
<details>
 <summary>O que me ajudou?</summary>

 [Biblioteca Paho - JS](https://www.hivemq.com/article/mqtt-client-library-encyclopedia-paho-js/)

 [Bootstrap](https://getbootstrap.com/docs/5.3)

 [Java Script](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

 [W3 Schools - JS](https://www.w3schools.com/jsrEF/default.asp)

 [Repositório de IOT - Professor Orivaldo](https://github.com/orivaldosantana/ura_html_panel/blob/main/test_mqtt_js.html)
</details>
