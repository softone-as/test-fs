import styled from 'styled-components';

export const InputWrapperContainer = styled.div`
    width: 100%;
    margin: 0 8px;

    @media only screen and (max-width: 767px) {
        width: 100%;
        margin: 0;

        &:not(:last-child) {
            margin-bottom: 24px;
        }
    }
`;

export const InputLabel = styled.label`
    margin: 16px 0;
    line-height: 1.33333;
    font-weight: 500;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 0.3px;
    color: #334155;
`;
