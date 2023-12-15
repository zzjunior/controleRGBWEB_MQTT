
# Configurações do broker MQTT
BROKER_URL = "mqtt.ect.ufrn.br"
BROKER_PORT = 1883
BROKER_USER = "mqtt"
BROKER_PASSWORD = "lar_mqtt"
CLIENT_ID = ubinascii.hexlify(machine.unique_id())
SUBSCRIBE_TOPIC = b"teste"
PUBLISH_TOPIC = b"atualização"
client = MQTTClient(CLIENT_ID, BROKER_URL, BROKER_PORT, BROKER_USER, BROKER_PASSWORD)

# Dando ping np broker já que não estamos recebendo mensagens
last_ping = time.time()
ping_interval = 60

# Tratando o dado recebido do mqtt e passando ele para o led e mandando feedback
def create_RGB(bstr1):
    str1 = bstr1.decode("utf-8")
    R=str1[14:str1.index(",")]
    str1 =str1[(str1.index(",")+2):]
    G=str1[7:str1.index(",")]
    str1 =str1[(str1.index(",")+2):]
    B=str1[6:]
    feedback(R,G,B)
    R=int(R)
    G=int(G)
    B=int(B)
    set_color(R,G,B)

# Função de feedback
def feedback(r,g,b):
  feed = "Mudando De cor para: (R %s,G %s,B %s)." % (r,g,b)
  print (feed)
  feed= str(feed).encode()
  client.publish(PUBLISH_TOPIC, feed )

# Dexando a cor de todos os leds iguais
def set_color(r, g, b):
  np = neopixel.NeoPixel(machine.Pin(15), 16)
  for i in range(16):
    np[i] = (r, g, b)
  np.write() 

def sub_cb(SUBSCRIBE_TOPIC, msg):
    create_RGB(msg)

# Conectando no broker e recebendo os dados do topico
def connect_and_subscribe():
  client.set_callback(sub_cb)
  client.connect()
  client.subscribe(SUBSCRIBE_TOPIC)
  print('Connected to %s MQTT broker, subscribed to %s topic' % (BROKER_URL, SUBSCRIBE_TOPIC))
  while True:
    if False:
      client.wait_msg()
    else:
      client.check_msg()
      global last_ping
      if (time.time() - last_ping) >= ping_interval:
        client.ping()
        last_ping = time.time()
        now = time.localtime()
        print(f"Pinging MQTT Broker, last ping :: {now[0]}/{now[1]}/{now[2]} {now[3]}:{now[4]}:{now[5]}")
      time.sleep(1)
  return client


# Reconectando caso de falha na conexão
def restart_and_reconnect():
  print('Failed to connect to MQTT broker. Reconnecting...')
  time.sleep(10)
  machine.reset()

try:
  client = connect_and_subscribe()
except OSError as e:
  restart_and_reconnect()

