import styled from 'styled-components';

type TextGroupContainerProps = {
    padding: string;
};

export const TextGroupContainer = styled.div<TextGroupContainerProps>`
    margin: 0;
    width: 100%;
    background-color: white;
    margin-bottom: 15px;
    padding: ${(props) => (props.padding ? props.padding : '30px')};

    & .container {
        padding: 0;

        @media only screen and (max-width: 1419px) {
            padding: 0;
        }

        @media only screen and (max-width: 1339px) {
            padding: 0;
        }

        @media only screen and (max-width: 1023px) {
            padding: 0;
        }
    }
`;

export const TextGroupTitle = styled.h2`
    font-size: 15px;
    font-weight: bold;
    padding: 0 4px;
    margin-top: 20px;
`;
