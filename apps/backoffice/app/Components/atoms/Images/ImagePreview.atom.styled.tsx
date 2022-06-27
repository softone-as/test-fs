import styled from 'styled-components';

type ImagePreviewItemProps = {
    backgroundImage: string;
};

export const ImagePreviewContainer = styled.div`
    width: 192px;
    height: 192px;
    max-width: 100%;
    position: relative;
    border: 6px solid #f8f8f8;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

    & > div {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
`;

export const ImagePreviewItem = styled.div<ImagePreviewItemProps>`
    background-image: ${(props) => props.backgroundImage};
`;
