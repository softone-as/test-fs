import { FaEye, FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

type ActionButtonsContainerProps = {
    position: 'flex-end' | 'center' | 'flex-start';
};

export const ActionButtonsContainer = styled.h2<ActionButtonsContainerProps>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.position};
`;

export const ActionButtonsDetailContainer = styled.button`
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ffffff;
    font-size: 0;
    -webkit-transition: -webkit-box-shadow 0.25s;
    transition: -webkit-box-shadow 0.25s;
    -o-transition: box-shadow 0.25s;
    transition: box-shadow 0.25s;
    transition: box-shadow 0.25s, -webkit-box-shadow 0.25s;
    margin-right: 0;

    &:hover {
        -webkit-box-shadow: 0 5px 20px rgba(227, 230, 236, 0.85);
        box-shadow: 0 5px 20px rgba(227, 230, 236, 0.85);
    }
`;

export const ActionButtonsValidateContainer = styled.button`
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ffffff;
    font-size: 0;
    -webkit-transition: -webkit-box-shadow 0.25s;
    transition: -webkit-box-shadow 0.25s;
    -o-transition: box-shadow 0.25s;
    transition: box-shadow 0.25s;
    transition: box-shadow 0.25s, -webkit-box-shadow 0.25s;
    margin-right: 0;

    &:hover {
        -webkit-box-shadow: 0 5px 20px rgba(227, 230, 236, 0.85);
        box-shadow: 0 5px 20px rgba(227, 230, 236, 0.85);
    }
`;

export const ActionButtonsDetailIcon = styled(FaEye)`
    font-size: 17px;
    fill: #11142d;
    width: 1.3em;
    height: 1em;
`;

export const ActionButtonsEditIcon = styled(FaPencilAlt)`
    font-size: 17px;
    fill: #11142d;
    width: 1em;
    height: 1em;
`;

export const ActionButtonsDeleteIcon = styled(FaTrash)`
    width: 1.13em;
    height: 1em;
    fill: #11142d;
    font-size: 15px;
`;

export const ActionButtonsValidateIcon = styled(FaCheck)`
    width: 1.13em;
    height: 1em;
    fill: #11142d;
    font-size: 15px;
`;
