export type ColorType = {
    id: string;
    name: string;
    colorHex: string;
    colorHexSecondary?: string;
};

export type CreateColorType = Omit<ColorType, 'id'>;

export type ColourOption = {
    value: string;
    label: string;
    color: string;
    isFixed?: boolean;
    isDisabled?: boolean;
};
