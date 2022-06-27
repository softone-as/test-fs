import { IConfig } from 'interface-models/config/config.interface';

export class ConfigResponse {
    id?: number;

    name: string;

    key: string;

    value: string;

    static fromEntity(prodcut: IConfig): ConfigResponse {
        return {
            id: prodcut.id,
            name: prodcut.name,
            key: prodcut.key,
            value: prodcut.value,
        };
    }

    static fromEntities(prodcuts: IConfig[]): ConfigResponse[] {
        return prodcuts.map((config) => ConfigResponse.fromEntity(config));
    }
}
