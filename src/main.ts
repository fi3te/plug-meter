import { loadEnv } from './environment';
import { startMqttClient } from './mqtt-client';
import { startMqttBroker } from './mqtt-broker';
import log from 'loglevel';
import { updateEnergy, getData, updateOnline } from './persistence';
import * as http from 'http';

log.setLevel('info');

const env = loadEnv();

startMqttBroker();

startMqttClient(`${env.PLUG_MODEL}-${env.PLUG_DEVICE_ID}`, online => {
    const status = online ? 'Online' : 'Offline';
    log.info(`Device status changed: ${status}`);
    updateOnline(online)
        .catch(err => log.error(err));
}, energy => {
    updateEnergy(energy)
        .catch(err => log.error(err));
});

const httpServer = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
    res.write(JSON.stringify(getData()));
    res.end();
});

httpServer.listen(env.HTTP_PORT, () => console.log(`HTTP server is running on port ${env.HTTP_PORT}...`));
