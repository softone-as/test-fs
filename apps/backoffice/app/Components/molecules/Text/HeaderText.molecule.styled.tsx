import styled from 'styled-components';

export const HeaderTextContainer = styled.div`
    display: flex;

    @media only screen and (max-width: 1339px) {
        margin: 0 -16px;
        padding: 40px 0;
    }

    @media only screen and (max-width: 1023px) {
        -webkit-box-orient: vertical;
        -webkit-box-direction: reverse;
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse;
        margin: 0;
        padding: 25px 0;
    }

    @media only screen and (max-width: 767px) {
        padding: 0;
    }
`;

export const HeaderTextTitleContainer = styled.div`
    padding: 48px;
    padding-bottom: 0;

    @media only screen and (max-width: 600px) {
        padding: 48px 0;
    }
`;

export const HeaderTextTitle = styled.h2`
    font-weight: bold;
    font-size: 34px;
    margin-bottom: 22px;

    @media only screen and (max-width: 767px) {
        padding: 0 24px;
    }
`;
