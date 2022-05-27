import aedes from 'aedes';
import * as net from 'net';
import log from 'loglevel';

export function startMqttBroker(): void {
    const server = net.createServer(aedes().handle);

    server.listen(1883, () => {
        log.info('MQTT broker is listening...');
    });
}
