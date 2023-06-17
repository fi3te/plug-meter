import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import log from "loglevel";
import path from "path";
import fs from "fs";

type Data = {
    online: boolean;
    currentEnergy: number;
    totalEnergy: number;
}

let db: LowSync<Data> | undefined;

export function initDatabase(filename: string): void {
    const dirname = path.dirname(filename);
    fs.mkdirSync(dirname, { recursive: true });

    const adapter = new JSONFileSync<Data>(filename);
    db = new LowSync(adapter, {
        online: false,
        currentEnergy: 0,
        totalEnergy: 0
    });

    db.read();
    log.info(`Initialized database (${filename}).`);
}

export function updateEnergy(energy: number): void {
    if (!db?.data) {
        throw initError();
    }
    const data = db.data;

    const previousEnergy = data.currentEnergy;
    data.currentEnergy = energy;

    if (energy >= previousEnergy) {
        data.totalEnergy += energy - previousEnergy;
    } else {
        data.totalEnergy += energy;
    }

    db.write();
}

export function updateOnline(online: boolean): void {
    if (!db?.data) {
        throw initError();
    }
    db.data.online = online;
    db.write();
}

export function getData(): Data {
    if (!db?.data) {
        throw initError();
    }
    return db.data;
}

function initError(): ReferenceError {
    return new ReferenceError('Database has not been initialized yet.');
}
