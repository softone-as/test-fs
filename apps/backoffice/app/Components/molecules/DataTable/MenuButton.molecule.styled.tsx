import { FaTrash } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import styled from 'styled-components';

export const MenuButtonContentContainer = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    @media only screen and (max-width: 767px) {
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
    }
`;

export const MenuButtonContainer = styled.button`
    -ms-flex-negative: 0;
    flex-shrink: 0;
    display: flex;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    align-items: center;
    background: #ffffff;
    font-size: 0;
    -webkit-transition: -webkit-box-shadow 0.25s;
    transition: -webkit-box-shadow 0.25s;
    -o-transition: box-shadow 0.25s;
    transition: box-shadow 0.25s;
    transition: box-shadow 0.25s, -webkit-box-shadow 0.25s;
    margin-right: 0;
    justify-content: center;

    &:hover {
        -webkit-box-shadow: 0 5px 20px rgba(227, 230, 236, 0.85);
        box-shadow: 0 5px 20px rgba(227, 230, 236, 0.85);
    }
`;

export const MenuButtonsEditIcon = styled(GrAdd)`
    font-size: 17px;
    fill: #11142d;
    width: 1em;
    height: 1em;
`;

export const MenuButtonsDeleteIcon = styled(FaTrash)`
    width: 1.13em;
    height: 1em;
    fill: #11142d;
    font-size: 15px;
`;
