import React, { Ref } from 'react';
import { forwardRef } from 'react';
import {
    ControllerRenderProps,
    FieldError,
    Path,
    UnpackNestedValue,
    FieldArray,
    UseFieldArrayReplace,
} from 'react-hook-form';
import ReactSelect, { GroupBase, PropsValue, StylesConfig } from 'react-select';
import Select from 'react-select/dist/declarations/src/Select';
import chroma from 'chroma-js';

import { ColourOption } from 'apps/backoffice/app/modules/Color/Entity/color';

import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';
import { SelectOption } from './Select.molecule';

type SelectColorProps<T> = ControllerRenderProps<T, Path<T>> & {
    options: ColourOption[];
    title: string;
    error: FieldError;
    replace: UseFieldArrayReplace<T, never>;
};

const SelectColor = forwardRef(
    <T,>(
        {
            options,
            value,
            title,
            error,
            name,
            onBlur,
            replace,
            ...rest
        }: SelectColorProps<T>,
        ref: Ref<
            Select<
                Record<string, unknown>,
                boolean,
                GroupBase<Record<string, unknown>>
            >
        >,
    ) => {
        const colourStyles: StylesConfig<ColourOption, true> = {
            control: (styles) => ({ ...styles, backgroundColor: 'white' }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                const color = chroma(data.color);
                return {
                    ...styles,
                    backgroundColor: isDisabled
                        ? undefined
                        : isSelected
                        ? data.color
                        : isFocused
                        ? color.alpha(0.1).css()
                        : undefined,
                    color: isDisabled
                        ? '#ccc'
                        : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                    cursor: isDisabled ? 'not-allowed' : 'default',

                    ':active': {
                        ...styles[':active'],
                        backgroundColor: !isDisabled
                            ? isSelected
                                ? data.color
                                : color.alpha(0.3).css()
                            : undefined,
                    },
                };
            },
            multiValue: (styles, { data }) => {
                const color = chroma(data.color);
                return {
                    ...styles,
                    backgroundColor: color.alpha(0.1).css(),
                };
            },
            multiValueLabel: (styles, { data }) => ({
                ...styles,
                color: data.color,
            }),
            multiValueRemove: (styles, { data }) => ({
                ...styles,
                color: data.color,
                ':hover': {
                    backgroundColor: data.color,
                    color: 'white',
                },
            }),
        };

        const handleChange = (val: ColourOption[]) => {
            const selectedOption = val?.map((option: ColourOption) => option);
            replace(
                selectedOption as unknown as Partial<
                    UnpackNestedValue<FieldArray<T, never>>
                >,
            );
        };

        const defaultValue = (): PropsValue<Record<string, unknown>> => {
            const values = (value as SelectOption[])?.map((val) => val.value);
            return options?.filter((option) => values?.includes(option.value));
        };

        return (
            <InputWrapper title={title} errorMessage={error?.message}>
                <ReactSelect
                    {...rest}
                    className="react__select"
                    closeMenuOnSelect={false}
                    isMulti
                    styles={colourStyles}
                    options={options}
                    onChange={handleChange}
                    name={name}
                    defaultValue={defaultValue()}
                    onBlur={onBlur}
                    ref={ref}
                />
            </InputWrapper>
        );
    },
);

export default SelectColor;
