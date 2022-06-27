import React, { useState } from 'react';
import {
    Control,
    Controller,
    FieldArray,
    Path,
    UnpackNestedValue,
    useFieldArray,
    UseFormClearErrors,
    UseFormGetValues,
} from 'react-hook-form';
import { Tag } from 'react-tag-input';

import TagsInput from '../Inputs/TagsInput.molecule';

type Tags = {
    id: string;
    text: string;
};

type ControlledTagsInputProps<T> = {
    name: Path<T>;
    title: string;
    control: Control<T, any>;
    clearErrors: UseFormClearErrors<T>;
    getValues: UseFormGetValues<T>;
    placeholder: string;
};

const ControlledTagsInput = <T,>({
    title,
    control,
    name,
    clearErrors,
    getValues,
    ...rest
}: ControlledTagsInputProps<T>): JSX.Element => {
    type TagValue = Partial<UnpackNestedValue<FieldArray<T, never>>>[];

    const { append, remove } = useFieldArray({
        control,
        name: name as never,
    });

    React.useEffect(() => {
        clearErrors(name);
    }, [getValues(name)]);

    const handleAddition = (val: TagValue | Tags) => {
        return append(val as TagValue);
    };

    const handleDelete = (index: number) => {
        return remove(index);
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TagsInput
                    {...rest}
                    {...field}
                    handleAddition={handleAddition}
                    handleDelete={handleDelete}
                    tags={(field.value as Tag[]) || []}
                    name={name as unknown as never}
                    value={field.value as unknown as never}
                    title={title}
                    error={error}
                />
            )}
        />
    );
};

export default ControlledTagsInput;
