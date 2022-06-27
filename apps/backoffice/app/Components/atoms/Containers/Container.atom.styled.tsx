import styled from 'styled-components';

type ContainerContentItemProps = {
    background: string;
};

export const ContainerContent = styled.div`
    padding: 0 64px 64px;

    @media only screen and (max-width: 1419px) {
        padding: 0 48px 48px;
    }

    @media only screen and (max-width: 1339px) {
        padding: 0 0 40px;
    }

    @media only screen and (max-width: 1023px) {
        padding: 0;
    }
`;

export const ContainerContentItem = styled.div<ContainerContentItemProps>`
    padding: 20px;
    position: relative;
    border-radius: 24px;
    background: ${(props) => props.background};
    padding-top: 0;

    &:before {
        content: '';
        position: absolute;
        top: 43px;
        left: 32px;
        right: 32px;
        bottom: -43px;
        z-index: -1;
        background: #e3e6ec;
        opacity: 0.91;
        -webkit-filter: blur(86.985px);
        filter: blur(86.985px);
        border-radius: 24px;
    }

    @media only screen and (max-width: 767px) {
        padding: 32px 0;

        &:before {
            -webkit-filter: blur(46.985px);
            filter: blur(46.985px);
        }
    }
`;
