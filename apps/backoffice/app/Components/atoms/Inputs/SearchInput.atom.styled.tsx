import { MdClear } from 'react-icons/md';
import styled from 'styled-components';

export const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;

    @media only screen and (max-width: 767px) {
        display: block;
    }

    @media only screen and (max-width: 600px) {
        flex: 1 !important;
    }
`;

export const SearchInputContent = styled.div`
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    margin-right: 45px;

    @media only screen and (max-width: 1179px) {
        margin-right: 30px;
    }

    @media only screen and (max-width: 767px) {
        margin: 0 0 16px;
    }
`;

export const SearchInputText = styled.input`
    width: 100%;
    height: 43px;
    padding: 0 20px 0 55px;
    border: none;
    border-radius: 16px;
    background: rgba(228, 228, 228, 0.2);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #1b1d21;

    &::-webkit-input-placeholder,
    &::-ms-input-placeholder,
    &::placeholder {
        color: #808191;
    }
`;

export const SearchClearIcon = styled(MdClear)`
    position: absolute;
    top: 50%;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    transform: translateY(-50%);
`;

export const SearchIconContainer = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 55px;
    font-size: 0;
    cursor: default !important;
`;

export const SearchIcon = styled.svg`
    font-size: 20px;
    fill: #11142d;
    -webkit-transition: fill 0.25s;
    -o-transition: fill 0.25s;
    transition: fill 0.25s;
    width: 1em;
    height: 1em;
`;
