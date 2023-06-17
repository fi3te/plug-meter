import aedes from 'aedes';
import { createServer } from 'net';
import log from 'loglevel';

export function startMqttBroker(): void {
    const broker = aedes.createBroker();
    const server = createServer(broker.handle);

    const port = 1883;
    server.listen(port, () => {
        log.info(`MQTT broker is running on port ${port}...`);
    });
}
