import * as mqtt from 'mqtt';
import log from 'loglevel';

export function startMqttClient(plugIdentifier: string,
                                onlineListener: (online: boolean) => void,
                                energyListener: (energy: number) => void): void {
    const client = mqtt.connect('mqtt://localhost:1883');
    const onlineTopic = `shellies/${plugIdentifier}/online`;
    const energyTopic = `shellies/${plugIdentifier}/relay/0/energy`;
    const handleError = (err: Error) => {
        if (err) {
            log.error(err);
        }
    };

    client.on('connect', () => {
        log.info('Established connection to MQTT broker.');
        client.subscribe(onlineTopic, handleError);
        client.subscribe(energyTopic, handleError);
    });

    client.on('message', (topic, message) => {
        if (onlineTopic === topic) {
            onlineListener('true' === message.toString());
        } else if (energyTopic === topic) {
            energyListener(+message.toString());
        }
    });
}
