import React, { useState } from 'react';
import styled from 'styled-components';

export const CheckBoxContainer = styled.label`
    display: inline-block;
    position: relative;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:hover .checkbox__tick {
        border-color: #01803c;
    }
`;

export const CheckBoxInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;

    &:checked + .checkbox__in .checkbox__tick {
        background: #01803c;
        border-color: #01803c;

        &:before {
            opacity: 1;
        }
    }

    &:checked + .checkbox__in .checkbox__tick {
        background: #01803c;
        border-color: #01803c;
    }

    &:checked + .checkbox__in .checkbox__tick:before {
        opacity: 1;
    }
`;

export const CheckBoxItem = styled.span`
    display: flex;
`;

export const CheckBoxTick = styled.span`
    position: relative;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 20px;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid #e4e4e4;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 10px;
        height: 9px;
        opacity: 0;
        background: url("data:image/svg+xml,%3Csvg width='10' height='9' viewBox='0 0 10 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 5.375L1.5 3.375L0 4.875L3.5 8.375L10 1.875L8.5 0.375L3.5 5.375Z' fill='white'/%3E%3C/svg%3E%0A")
            no-repeat 50% 50%/100% auto;
        -webkit-transition: opacity 0.25s;
        -o-transition: opacity 0.25s;
        transition: opacity 0.25s;
    }
`;

export const CheckBoxTitle = styled.span`
    margin-left: 15px;
`;
