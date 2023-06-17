import aedes from 'aedes';
import { createServer } from 'net';
import log from 'loglevel';

export function startMqttBroker(): void {
    const broker = aedes.createBroker();
    const server = createServer(broker.handle);

    server.listen(1883, () => {
        log.info('MQTT broker is listening...');
    });
}
