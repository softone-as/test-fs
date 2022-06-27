import React, { useState } from 'react';
import {
    SearchClearIcon,
    SearchIcon,
    SearchIconContainer,
    SearchInputContainer,
    SearchInputContent,
    SearchInputText,
} from './SearchInput.atom.styled';

type SearchInputProps = React.HTMLAttributes<HTMLInputElement> & {
    value: string;
    handleClear: () => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
    handleClear,
    value,
    ...rest
}) => {
    return (
        <SearchInputContainer>
            <SearchInputContent>
                <SearchIconContainer>
                    <SearchIcon>
                        <use xlinkHref="/unity/img/sprite.svg#icon-search"></use>
                    </SearchIcon>
                </SearchIconContainer>
                <SearchInputText
                    {...rest}
                    type="text"
                    placeholder="Cari..."
                    value={value || ''}
                />

                <SearchClearIcon onClick={handleClear} />
            </SearchInputContent>
        </SearchInputContainer>
    );
};

export default SearchInput;
