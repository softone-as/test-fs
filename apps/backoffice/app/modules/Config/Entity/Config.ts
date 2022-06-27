export type ConfigType = {
    id: string;
    name: string;
    key: string;
    value: string;
};

export type FormConfigType = Omit<ConfigType, 'id'>;
