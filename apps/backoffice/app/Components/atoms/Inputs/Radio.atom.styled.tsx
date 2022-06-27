import styled from 'styled-components';

export const RadioContainer = styled.label`
    display: inline-block;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

export const RadioInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;

    &:checked + .radio__in .radio__tick {
        background-color: #00803c;
    }

    &:checked + .radio__in .radio__tick:before {
        opacity: 1;
    }

    &:checked + .radio__in .radio__text {
        color: #11142d;
    }
`;

export const RadioContent = styled.span`
    display: flex;
`;

export const RadioTick = styled.span`
    position: relative;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 20px;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #e4e4e4;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
`;

export const RadioText = styled.span``;
