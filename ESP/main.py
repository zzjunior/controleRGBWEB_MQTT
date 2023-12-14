

# Configurações do broker MQTT
BROKER_URL = "mqtt.ect.ufrn.br"
BROKER_PORT = 1883
BROKER_USER = "mqtt"
BROKER_PASSWORD = "lar_mqtt"
CLIENT_ID = ubinascii.hexlify(machine.unique_id())
topic = b"teste"

# Ping the MQTT broker since we are not publishing any message
last_ping = time.time()
ping_interval = 60

def sub_cb(topic, msg):
  print((topic, msg))

def connect_and_subscribe():
  client = MQTTClient(CLIENT_ID, BROKER_URL, BROKER_PORT, BROKER_USER, BROKER_PASSWORD)
  client.set_callback(sub_cb)
  client.connect()
  client.subscribe(topic)
  print('Connected to %s MQTT broker, subscribed to %s topic' % (BROKER_URL, topic))
  while True:
    if False:
      # Blocking wait for message
      client.wait_msg()
    else:
      # Non-blocking wait for message
      client.check_msg()
      # Then need to sleep to avoid 100% CPU usage (in a real
      # app other useful actions would be performed instead)
      global last_ping
      if (time.time() - last_ping) >= ping_interval:
        client.ping()
        last_ping = time.time()
        now = time.localtime()
        print(f"Pinging MQTT Broker, last ping :: {now[0]}/{now[1]}/{now[2]} {now[3]}:{now[4]}:{now[5]}")
      time.sleep(1)
  return client


def restart_and_reconnect():
  print('Failed to connect to MQTT broker. Reconnecting...')
  time.sleep(10)
  machine.reset()

try:
  client = connect_and_subscribe()
except OSError as e:
  restart_and_reconnect()

