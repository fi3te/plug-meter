import { JSONFile, Low } from 'lowdb';

type Data = {
    online: boolean;
    currentEnergy: number;
    totalEnergy: number;
}

const adapter = new JSONFile<Data>('db.json');
const db = new Low(adapter);

await db.read();

db.data ||= {
    online: false,
    currentEnergy: 0,
    totalEnergy: 0
};

export async function updateEnergy(energy: number) {
    if (db.data) {
        const data = db.data;

        const previousEnergy = data.currentEnergy;
        data.currentEnergy = energy;

        if (energy >= previousEnergy) {
            data.totalEnergy += energy - previousEnergy;
        } else {
            data.totalEnergy += energy;
        }

        await db.write();
    }
}

export async function updateOnline(online: boolean) {
    if (db.data) {
        db.data.online = online;
        await db.write();
    }
}

export function getData(): Data | null {
    return db.data;
}