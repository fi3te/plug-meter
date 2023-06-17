import * as dotenv from 'dotenv';

export interface Env extends NodeJS.ProcessEnv {
    PLUG_MODEL: 'shellyplug' | 'shellyplug-s';
    PLUG_DEVICE_ID: string;
    MQTT_USERNAME: string;
    MQTT_PASSWORD: string;
    HTTP_PORT: string;
    DB_FILENAME: string;
}

export function loadEnv(): Env {
    dotenv.config({path: 'application.env'});
    return process.env as Env;
}
