import { Kafka } from 'kafkajs';
import config from '../config/index.js';

const client = new Kafka({
  clientId: config.kafka.CLIENT_ID,
  brokers: [config.kafka.BROKERS],
});

const producer = client.producer();
await producer.connect();

export default {
  sendRecord: async (topic, data) => {
    const bufferData = Buffer.from(JSON.stringify(data));
    const record = {
      topic,
      messages: [{ value: bufferData }],
    };
    await producer.send(record);
  },
};
