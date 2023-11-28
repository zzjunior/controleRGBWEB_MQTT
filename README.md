### projeto-IOT
# PROJETO FINAL DE IOT - INTERNET DAS COISAS
## Disciplina da ECT - UFRN
###### Professor Orivaldo

O intuito do projeto é criar um controlador RGB de uma ou várias leds de um microcontrolador ESP.

Para isso foi criado uma página web com um modele de "Controle" de cores RGB, com tela de visualização.

 - À página reconhece ops valores das cores graças a combinação do HTML, JAVA SCRITP e BOOTSTRAP, onde é utilizada uma função dentro do arquivo "enviando_dados.js" onde primeiro são atualizadas as cores de acordo com os valores dos formulários HTML.

 - Após isso é criada uma função para ler estes dados e gerar um objeto JSON, para realizar o envio deste Objeto usando um Host MQTT.

 - A ultima função configura usa as váriaveis de dados do MQTT para enviar o objeto JSON fazendo um publish no host e tópico MQTT configurado.

<details>
 <summary>Usamos</summary>

 [Biblioteca Paho - JS](https://www.hivemq.com/article/mqtt-client-library-encyclopedia-paho-js/)

 [Bootstrap](https://getbootstrap.com/docs/5.3)

 [Java Script](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

 [W3 Schools - JS](https://www.w3schools.com/jsrEF/default.asp)
</details>