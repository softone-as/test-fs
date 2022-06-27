import React, { forwardRef, LegacyRef } from 'react';
import { ControllerRenderProps, FieldError, Path } from 'react-hook-form';
import axios from 'axios';

import { EndpointRoute } from '../../../Enums/Route';

import ImagePreview from '../../atoms/Images/ImagePreview.atom';
import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';

type ImageUploadProps<T> = ControllerRenderProps<T, Path<T>> & {
    title: string;
    name: Path<T>;
    image: string;
    errorMessage: FieldError;
};

const ImageUpload = forwardRef(
    <T,>(
        {
            title,
            errorMessage,
            onChange,
            image: picture,
            ...rest
        }: ImageUploadProps<T>,
        ref: LegacyRef<HTMLInputElement>,
    ): JSX.Element => {
        const [fileName, setFileName] = React.useState<string>('');
        const [image, setImage] = React.useState<string | null>(
            picture || null,
        );

        const [progress, setProgress] = React.useState<number>(0);

        const handlePreviewImage = (
            e: React.ChangeEvent<HTMLInputElement>,
        ): void => {
            setImage(URL.createObjectURL(e.target.files[0]));
            setFileName(e.target.value);
        };

        const handleUploadImage = async (
            e: React.ChangeEvent<HTMLInputElement>,
        ) => {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            const { data } = await axios.post(
                EndpointRoute.UploadImage,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress =
                            (progressEvent.loaded / progressEvent.total) * 50;
                        setProgress(progress);
                    },
                    onDownloadProgress: (progressEvent) => {
                        const progress =
                            50 +
                            (progressEvent.loaded / progressEvent.total) * 50;
                        setProgress(progress);
                    },
                },
            );

            onChange(data.data?.file_url);
        };

        return (
            <InputWrapper title={title} errorMessage={errorMessage?.message}>
                <label htmlFor="imageUpload">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input
                                {...rest}
                                value={fileName}
                                type="file"
                                id="imageUpload"
                                onChange={(e) => {
                                    handlePreviewImage(e);
                                    handleUploadImage(e);
                                }}
                                ref={ref}
                                accept=".png, .jpg, .jpeg, .webp"
                            />
                        </div>
                        <ImagePreview
                            image={
                                image ??
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStnPtdCrmYySpCRIGCzmncnU7cugyZF4T-Vg&usqp=CAU'
                            }
                            progress={progress}
                        />
                    </div>
                </label>
            </InputWrapper>
        );
    },
);

export default ImageUpload;
