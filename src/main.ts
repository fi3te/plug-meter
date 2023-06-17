import { loadEnv } from './environment.js';
import { startMqttClient } from './mqtt-client.js';
import { startMqttBroker } from './mqtt-broker.js';
import log from 'loglevel';
import { getData, initDatabase, updateEnergy, updateOnline } from './persistence.js';
import * as http from 'http';

log.setLevel('info');

const env = loadEnv();

const filename = env.DB_FILENAME || './data/db.json';
initDatabase(filename);

startMqttBroker();

startMqttClient(`${env.PLUG_MODEL}-${env.PLUG_DEVICE_ID}`, online => {
    const status = online ? 'Online' : 'Offline';
    log.info(`Device status changed: ${status}`);
    updateOnline(online);
}, energy => updateEnergy(energy));

const httpServer = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
    res.write(JSON.stringify(getData()));
    res.end();
});

const port = +(env.HTTP_PORT || 80);
httpServer.listen(port, () => log.info(`HTTP server is running on port ${port}...`));
