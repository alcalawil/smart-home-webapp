var awsIot = require('aws-iot-device-sdk');
const EventEmitter = require('events').EventEmitter;

class MqttService {
  constructor() {
    this.mqttClient = null;
    this.messagesEmitter = new EventEmitter();
  }

  connect(key,cert,ca,host,clientId) {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = awsIot.device({
      privateKey: key,
      clientCert: cert,
      caCert: ca,
      clientId: clientId,
      host: host
    });

    // Mqtt error calback
    this.mqttClient.on('error', err => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log('connect');
      this.mqttClient.subscribe('temperature');
    });

    // When a message arrives, console.log it
    this.mqttClient.on('message', (topic, message) => {
      console.log(message.toString());
      this.messagesEmitter.emit(topic, message);
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  sendMessage(topic, message) {
    this.mqttClient.publish(topic, message);
  }

  subscribeToMessages() {
    return this.messagesEmitter;
  }
}

export default MqttService;
