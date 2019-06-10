import MQTT from 'mqtt';
const EvenetEmitter = require('events').EventEmitter;

class mqttClient {
  constructor() {
    this.client =  null;
    this.mqttEvents = new EvenetEmitter();
  }

  async connect() {
    return new Promise((resolve, reject) => {
        this.client = MQTT.connect("ws://192.168.8.104:9001");
        this.client.on('connect', ((topic, message) => {
            this.client.subscribe('presence');
            resolve();
        }));
        this.client.on('error', (error) => {
            reject(error);
        });
        this.client.on('message', ((topic, message) => {
            console.log(topic,message);
            this.mqttEvents.emit(topic, message);
        }));
    });
  }

  getEvents() {
    return this.mqttEvents;
  }
}

export default mqttClient;