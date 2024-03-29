import fs from 'fs';
import yaml from 'js-yaml';

interface Config {
    JWT_SECRET: string;
    PORT: number;
}

export function loadConfig(filePath: string): Config {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const ext = filePath.split('.').pop();

    if (ext == 'json') {
        return JSON.parse(fileContent);
    } else if (ext === 'yaml' || ext === 'yml') {
        return yaml.load(fileContent) as Config;
    } else {
        throw new Error('Unsupported file format. Only JSON and YAML files are supported.');
    }
}