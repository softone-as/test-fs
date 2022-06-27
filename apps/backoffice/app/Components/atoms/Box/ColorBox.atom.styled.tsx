import styled from 'styled-components';

type ColorBoxContentProps = {
    backgroundColor: string;
};

export const ColorBoxContainer = styled.div`
    display: flex;
    margin-right: 3px;
    margin-bottom: 2px;
    align-items: center;
`;

export const ColorBoxContent = styled.div<ColorBoxContentProps>`
    width: 24px;
    height: 24px;
    border-radius: 5px;
    background-color: ${(props) => props.backgroundColor};
`;

export const ColorBoxText = styled.span`
    margin-left: 5px;
`;
