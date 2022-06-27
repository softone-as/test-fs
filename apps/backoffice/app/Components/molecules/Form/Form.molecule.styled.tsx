import styled from 'styled-components';

export const FormContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;

    @media only screen and (max-width: 1339px) {
        width: 100%;
        max-width: 930px;
    }

    @media only screen and (max-width: 1023px) {
        padding: 0 32px 40px;
    }

    @media only screen and (max-width: 767px) {
        padding: 0 16px 32px;
    }
`;

export const FormContent = styled.div`
    position: relative;
    padding: 32px 32px 38px;
    background: #ffffff;
    border-radius: 24px;
    width: 720px;
    margin: auto;
    margin-top: 50px;
    max-width: 100%;

    &:before {
        content: '';
        position: absolute;
        top: 28px;
        left: 18px;
        right: 18px;
        bottom: -28px;
        z-index: -1;
        background: #e3e6ec;
        opacity: 0.91;
        -webkit-filter: blur(86.985px);
        filter: blur(86.985px);
        border-radius: 24px;
    }

    @media only screen and (max-width: 767px) {
        padding-bottom: 32px;

        &:before {
            -webkit-filter: blur(46.985px);
            filter: blur(46.985px);
        }
    }
`;

export const FormTitle = styled.h4`
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    line-height: 1.5;
    letter-spacing: -0.5px;
    margin-bottom: 20px;
    font-weight: bold;
`;

export const FormMain = styled.form`
    border-radius: 24px;
`;

export const FormFieldSet = styled.div`
    margin-bottom: 24px;
`;

export const FormButton = styled.button`
    background-color: #01803c;
    color: white;
    min-width: -webkit-fit-content;
    min-width: -moz-fit-content;
    min-width: fit-content;
    height: 43px;
    border-radius: 5px;
    width: 100px;
    border-radius: 10px;
    font-weight: bold;

    &:disabled {
        background-color: #cccccc
    }
}
`;
