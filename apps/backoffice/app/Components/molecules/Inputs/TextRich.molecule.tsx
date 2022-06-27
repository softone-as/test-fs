import React, { forwardRef, LegacyRef } from 'react';
import { ControllerRenderProps, FieldError, Path } from 'react-hook-form';
import ReactQuill from 'react-quill';

import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'font',
    'size',
];

type TextRichProps<T> = Omit<ControllerRenderProps<T, Path<T>>, 'value'> & {
    title: string;
    errorMessage: FieldError;
    value: string;
};

const TextRich = forwardRef(
    <T,>(
        {
            title,
            value,
            onChange,
            errorMessage,
            onBlur,
            ...rest
        }: TextRichProps<T>,
        ref: LegacyRef<ReactQuill>,
    ) => {
        return (
            <InputWrapper title={title} errorMessage={errorMessage?.message}>
                <ReactQuill
                    {...rest}
                    value={value || ''}
                    modules={modules}
                    formats={formats}
                    onChange={(val) => {
                        onChange(val);
                    }}
                    onBlur={onBlur}
                    ref={ref}
                />
            </InputWrapper>
        );
    },
);

export default TextRich;
