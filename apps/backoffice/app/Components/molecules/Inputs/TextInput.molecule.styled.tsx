import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    border-radius: 8px;
    background: transparent;
    border: 1px solid rgba(228, 228, 228);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #11142d;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    height: 38px;
    padding: 0 23px;

    &:disabled {
        background-color: #cccccc;
        border: none;
    }

    &::placeholder {
        font-weight: 400;
        font-size: 12px;
    }
`;
