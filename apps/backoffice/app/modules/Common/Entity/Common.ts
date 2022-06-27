type ErrorValidationType = {
    property: string;
    message: string;
};

export type ErrorType = {
    statusCode: number;
    message: string;
    errors: ErrorValidationType[];
};

export type SuccessType = {
    statusCode: number;
    message: string;
};

export type SelectOptionType = {
    value: string;
    label: string;
};

export type SelectOptionColorType = SelectOptionType & {
    color: string;
};

export type SelectOptionBodyType = {
    id: string;
    name: string;
};

export type OptionType = SelectOptionType | SelectOptionBodyType;
