import React, { useState } from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import ImageUpload from '../Inputs/ImageUpload.molecule';

type ControlledImageUploadProps<T> = {
    title: string;
    name: Path<T>;
    image: string;
    control: Control<T, any>;
};

const ControlledImageUpload = <T,>({
    title,
    name,
    control,
    image,
    ...rest
}: ControlledImageUploadProps<T>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <ImageUpload
                    {...rest}
                    {...field}
                    name={name as unknown as never}
                    errorMessage={error}
                    title={title}
                    value={field.value as unknown as never}
                    image={image}
                />
            )}
        />
    );
};

export default ControlledImageUpload;
