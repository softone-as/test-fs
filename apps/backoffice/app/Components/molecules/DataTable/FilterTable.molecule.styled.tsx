import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

export const FilterTableLeftContainer = styled.div`
    @media only screen and (max-width: 600px) {
        margin-bottom: 10px;
    }
`;

export const FilterTableLeftContent = styled.div`
    display: flex;
    margin: 0 -8px;

    @media only screen and (max-width: 767px) {
        display: flex;
        margin: 0;
        align-items: baseline;
    }
`;

export const FilterTableRightContainer = styled.div``;

export const FilterTableRightContent = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: end;

    @media only screen and (max-width: 767px) {
        display: block;
    }

    @media only screen and (max-width: 600px) {
        flex: 1 !important;
    }
`;
