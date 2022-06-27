import React, { forwardRef, LegacyRef } from 'react';
import axios from 'axios';
import {
    ControllerRenderProps,
    FieldError,
    Path,
    UseFieldArrayAppend,
    UseFieldArrayReplace,
    UseFieldArrayRemove,
} from 'react-hook-form';

import { EndpointRoute } from '../../../Enums/Route';

import Button, { ButtonVariant } from '../../atoms/Buttons/Button';
import ImagePreview from '../../atoms/Images/ImagePreview.atom';
import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';

type MultipleImageUploadProps<T> = ControllerRenderProps<T, Path<T>> & {
    title: string;
    name: Path<T>;
    errorMessage: FieldError;
    replace: UseFieldArrayReplace<T, never>;
    remove: UseFieldArrayRemove;
    fields: Record<'id', string>[];
    append: UseFieldArrayAppend<T, never>;
    previewImages: string[];
};

const MultipleImageUpload = forwardRef(
    <T,>(
        {
            title,
            errorMessage,
            append,
            replace,
            remove,
            fields,
            previewImages,
            ...rest
        }: MultipleImageUploadProps<T>,
        ref: LegacyRef<HTMLInputElement>,
    ): JSX.Element => {
        const [images, setImages] = React.useState<string[] | null>(
            previewImages || [],
        );
        const [fileName, setFileName] = React.useState<string>('');
        const [progress, setProgress] = React.useState<number>(0);

        const handlePreviewImage = (
            e: React.ChangeEvent<HTMLInputElement>,
        ): void => {
            const uploadImages = [];
            for (let i = 0; i < e.target.files.length; i++) {
                uploadImages.push(URL.createObjectURL(e.target.files[i]));
            }

            setImages([...images, ...uploadImages]);
            setFileName(e.target.value);
        };

        const handleDeleteImage = (image: string) => {
            // remove image preview
            const updatedImages = images.filter((img) => img !== image);
            setImages(updatedImages);

            // remove image file
            const index = images.findIndex((img) => img === image);
            remove(index);
        };

        const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const formData = new FormData();

            for (let index = 0; index < e.target.files.length; index++) {
                formData.append('files', e.target.files[index]);
            }

            const { data } = await axios.post(
                EndpointRoute.UploadImages,
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

            return data.data.file_urls;
        };

        const handleAddImage = async (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            handlePreviewImage(event);
            const uploadedImages = await uploadImages(event);

            if (fields.length > 0) {
                append(uploadedImages as any);
            } else {
                replace(uploadedImages as any);
            }
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
                                multiple
                                id="imageUpload"
                                onChange={handleAddImage}
                                ref={ref}
                                accept=".png, .jpg, .jpeg"
                            />
                        </div>

                        <ImagePreview image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStnPtdCrmYySpCRIGCzmncnU7cugyZF4T-Vg&usqp=CAU" />
                    </div>
                </label>

                <div className="row">
                    {images &&
                        images?.map((image) => (
                            <div
                                className="col-12 col-sm-6 col-lg-4"
                                key={image}
                            >
                                <ImagePreview
                                    image={image}
                                    progress={progress}
                                />
                                <Button
                                    className="btn__delete__image"
                                    variant={ButtonVariant.DANGER}
                                    onClick={() => handleDeleteImage(image)}
                                >
                                    Hapus
                                </Button>
                            </div>
                        ))}
                </div>
            </InputWrapper>
        );
    },
);

export default MultipleImageUpload;
