# Guia sobre o código Código!
Aqui estão os arquivos e seu papel no código, juntamente de alguns trechos importantes.<br>
...Lembrando que as conexões e códigos relacionados ao simulador Wokwi, só devem ser utilizados no caso de estar usando o simulador!

#### [`boot.py:`](https://github.com/zzjunior/controleRGBWEB_MQTT/edit/main/Esp_32_Programa/boot.py) 
###### Responsavel por dar load nas bibliotecas e conectar no wifi no caso de estar usando o simulador
Importando bibliotecas e etc...
~~~python
...
import time
from umqttsimple import MQTTClient
import ubinascii
import machine
import micropython
import network
import esp
esp.osdebug(None)
import gc
gc.collect()
import neopixel
...
~~~
Conectando Wifi no simulador Wokwi...
~~~python
...
ssid = 'Wokwi-GUEST'
password = ''
station = network.WLAN(network.STA_IF)
...
~~~

#### [`main.py:`](https://github.com/zzjunior/controleRGBWEB_MQTT/edit/main/Esp_32_Programa/main.py) 
###### Responsavel por realisar a maior parte do codigo
Configurações de conexão com o MQTT:
~~~~python
...
BROKER_URL = "mqtt.ect.ufrn.br"
BROKER_PORT = 1883
BROKER_USER = "mqtt"
BROKER_PASSWORD = "lar_mqtt"
CLIENT_ID = ubinascii.hexlify(machine.unique_id())
SUBSCRIBE_TOPIC = b"teste"
PUBLISH_TOPIC = b"atualização"
client = MQTTClient(CLIENT_ID, BROKER_URL, BROKER_PORT, BROKER_USER, BROKER_PASSWORD)
...
~~~~
#### [`umqttsimple.py:`](https://github.com/zzjunior/controleRGBWEB_MQTT/edit/main/Esp_32_Programa/umqttsimple.py) 
###### Biblioteca umqtt_simple usada para manipular o broker MQTT
Biblioteca responsável pelos códigos de manipulação do MQTT
Importando ela no boot.py
~~~~python
...
from umqttsimple import MQTTClient
...
~~~~


#### [`diagram.json:`](https://github.com/zzjunior/controleRGBWEB_MQTT/edit/main/Esp_32_Programa/diagram.json:) 
###### Diagrama das peças usadas no Wokwi !Apenas usar caso for usar no [Wokwi](https://wokwi.com/)!
Diagrama padrão em `JSON` gerado no Wokwi, com as informações em objeto do que foi utilizado no simulador ESP32...
~~~~python
...
    {
      "type": "wokwi-led-ring",
      "id": "ring1",
      "top": -28.16,
      "left": 125.99,
      "attrs": { "pixels": "16", "background": "black" }
    }
...
~~~~



