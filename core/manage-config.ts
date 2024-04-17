import { promises as fs } from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'config.json');

export const readConfig = async () => {
    const absolutePath = path.resolve(configPath);
    try {
        const fileData = await fs.readFile(absolutePath);
        return JSON.parse(fileData.toString());
    } catch (err) {
        await writeConfig({});
    }
}

export const getValue = async (key: string) => {
    const config = await readConfig();
    return config[key];
}

export const setValue = async (key: string, value: any) => {
    const config = await readConfig();
    config[key] = value;
    await writeConfig(config);
}

export const removeValue = async (key: string) => {
    const config = await readConfig();
    delete config[key];
    await writeConfig(config);
}

export const writeConfig = async (data: any) => {
    const absolutePath = path.resolve(configPath);
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(absolutePath, jsonData);
        console.log('Config file updated successfully!');
    } catch (err) {
        console.error('Error writing the file:', err);
        process.exit(1);
    }
}