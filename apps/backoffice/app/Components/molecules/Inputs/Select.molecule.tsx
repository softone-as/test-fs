import React, { Ref } from 'react';
import { forwardRef } from 'react';
import {
    ControllerRenderProps,
    FieldArray,
    FieldError,
    Path,
    PathValue,
    UnpackNestedValue,
    UseFieldArrayReplace,
} from 'react-hook-form';
import ReactSelect, { GroupBase, PropsValue, StylesConfig } from 'react-select';
import Select from 'react-select/dist/declarations/src/Select';

import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';

export type SelectOption = {
    label: string;
    value: string | number;
};

type SelectProps<T> = ControllerRenderProps<T, Path<T>> & {
    options: SelectOption[];
    title: string;
    error: FieldError;
    isMulti?: boolean;
    replace?: UseFieldArrayReplace<T, never>;
};

const SelectInput = forwardRef(
    <T,>(
        {
            options,
            value,
            onChange,
            title,
            error,
            name,
            onBlur,
            replace,
            ...rest
        }: SelectProps<T>,
        ref: Ref<
            Select<
                Record<string, unknown>,
                boolean,
                GroupBase<Record<string, unknown>>
            >
        >,
    ) => {
        const valueRef =
            React.useRef<UnpackNestedValue<PathValue<T, Path<T>>>>(value);
        valueRef.current = value;

        const colourStyles: StylesConfig<Record<string, unknown>> = {
            option: (styles, { isDisabled, isFocused, isSelected }) => {
                return {
                    ...styles,
                    backgroundColor: isDisabled
                        ? undefined
                        : isSelected
                            ? '#53c0cc'
                            : isFocused
                                ? '#53c0cc'
                                : undefined,
                    ':active': {
                        ...styles[':active'],
                        backgroundColor: !isDisabled ? '#01803c' : undefined,
                    },
                };
            },
            valueContainer: (styles) => ({
                ...styles,
                padding: '2px 23px',
            }),
            placeholder: (styles) => ({
                ...styles,
                fontSize: '12px',
            }),
            singleValue: (styles) => ({
                ...styles,
                fontSize: '14px',
                color: '#11142d',
            }),
        };

        const isSelectAllSelected =
            (valueRef.current as SelectOption[])?.length === options?.length;

        const currentOptions = () => {
            if (rest.isMulti) {
                const multiOptions = [
                    {
                        label: 'Select All',
                        value: 'all',
                    },
                ];

                return [...multiOptions, ...options];
            } else {
                return options;
            }
        };

        const currentValue = (): PropsValue<Record<string, unknown>> => {
            return isSelectAllSelected
                ? options
                : options?.find((option) => option?.value === value);
        };

        const defaultValue = (): PropsValue<Record<string, unknown>> => {
            if (rest.isMulti) {
                const values = (value as SelectOption[])?.map(
                    (val) => val?.value,
                );
                return options?.filter((option) =>
                    values?.includes(option?.value),
                );
            } else {
                return options?.find(
                    (option) =>
                        option?.value === (value as SelectOption)?.value,
                );
            }
        };

        const handleChange = (newValue, actionMeta) => {
            const { action, option } = actionMeta;
            if (rest.isMulti) {
                if (action === 'select-option' && option?.value === 'all') {
                    const selectedAllOptions = options?.map(
                        (option) => option?.value,
                    );
                    replace(
                        selectedAllOptions as unknown as Partial<
                            UnpackNestedValue<FieldArray<T, never>>
                        >[],
                    );
                } else if (action === 'clear') {
                    replace([]);
                } else {
                    replace(newValue);
                }
            } else {
                onChange((newValue as SelectOption)?.value);
            }
        };

        return (
            <InputWrapper title={title} errorMessage={error?.message}>
                <ReactSelect
                    {...rest}
                    className="react__select"
                    styles={colourStyles}
                    value={currentValue()}
                    onChange={handleChange}
                    options={currentOptions()}
                    name={name}
                    defaultValue={defaultValue()}
                    onBlur={onBlur}
                    ref={ref}
                />
            </InputWrapper>
        );
    },
);

export default SelectInput;
