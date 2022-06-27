import React, { forwardRef } from 'react';
import { WithContext as ReactTags, ReactTagsProps } from 'react-tag-input';

import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';

import { ControllerRenderProps, FieldError, Path } from 'react-hook-form';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

type TagsInputProps<T> = ReactTagsProps &
    ControllerRenderProps<T, Path<T>> & {
        title: string;
        error: FieldError;
    };

const TagsInput = forwardRef(
    <T,>(
        {
            title,
            error,
            tags,
            handleDelete,
            handleAddition,
            ...rest
        }: TagsInputProps<T>,
        ref: React.LegacyRef<ReactTags>,
    ): JSX.Element => {
        return (
            <InputWrapper title={title} errorMessage={error?.message}>
                <ReactTags
                    {...rest}
                    tags={tags}
                    ref={ref}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    inputFieldPosition="top"
                    autofocus={false}
                    classNames={{
                        tagInputField: 'field__input',
                        tag: 'tags',
                        remove: 'tags__remove',
                    }}
                />
            </InputWrapper>
        );
    },
);

export default TagsInput;
