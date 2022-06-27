import React, { useState } from 'react';
import { Control, Controller, Path, useFieldArray } from 'react-hook-form';

import MultipleImageUpload from '../Inputs/MultipleImageUpload.molecule';

type ControlledMultipleImageUploadProps<T> = {
    title: string;
    name: Path<T>;
    control: Control<T, any>;
    previewImages: string[];
};

const ControlledMultipleImageUpload = <T,>({
    title,
    name,
    control,
    previewImages,
    ...rest
}: ControlledMultipleImageUploadProps<T>): JSX.Element => {
    const { replace, remove, fields, append } = useFieldArray({
        control,
        name: name as never,
    });

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <MultipleImageUpload
                    {...rest}
                    {...field}
                    replace={replace}
                    remove={remove}
                    fields={fields}
                    append={append}
                    name={name as unknown as never}
                    errorMessage={error}
                    title={title}
                    value={field.value as unknown as never}
                    previewImages={previewImages}
                />
            )}
        />
    );
};

export default ControlledMultipleImageUpload;
