import { useState, useEffect, useRef } from 'react';
import { promises as fs } from 'fs';
import path from 'path';

interface Config {
    [key: string]: any;
}

interface UseConfigHook {
    config: Config | null;
    error: string | null;
    getValue: (key: string) => any;
    setValue: (key: string, value: any) => Promise<void>;
    removeValue: (key: string) => Promise<void>;
    loadConfig: () => Promise<void>;
    configLoaded: boolean;
}

const configPath = 'boostx.json';

export const useConfig = (): UseConfigHook => {
    const [config, setConfig] = useState<Config | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [configLoaded, setConfigLoaded] = useState(false);
    const writeLock = useRef(false);

    useEffect(() => {
        loadConfig().catch(err => setError('Failed to load config: ' + err.message));
    }, []);

    const loadConfig = async () => {
        try {
            const absolutePath = path.resolve(configPath);
            const fileData = await fs.readFile(absolutePath);
            setConfig(JSON.parse(fileData.toString()));
            setConfigLoaded(true);
        } catch (err) {
            setError(JSON.stringify(err));
            await writeConfig({})
            setConfigLoaded(true);
        }
    };

    const getValue = (key: string) => {
        return config ? config[key] : undefined;
    };

    const setValue = async (key: string, value: any) => {
        while (writeLock.current) await new Promise(resolve => setTimeout(resolve, 10));
        if (config) {
            const newConfig = { ...config, [key]: value };
            await writeConfig(newConfig);
        }
    };

    const removeValue = async (key: string) => {
        while (writeLock.current) await new Promise(resolve => setTimeout(resolve, 10));
        if (config && key in config) {
            const { [key]: _, ...newConfig } = config;
            await writeConfig(newConfig);
        }
    };

    const writeConfig = async (data: Config) => {
        writeLock.current = true;
        try {
            const absolutePath = path.resolve(configPath);
            await fs.writeFile(absolutePath, JSON.stringify(data, null, 2));
            setConfig(data);
        } catch (err) {
            setError(JSON.stringify(err));
        } finally {
            writeLock.current = false;
        }
    };

    return { config, error, getValue, setValue, removeValue, loadConfig, configLoaded };
};
