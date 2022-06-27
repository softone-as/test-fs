import styled from 'styled-components';

type OverlayBoxContainerProps = {
    show: boolean;
};

export const OverlayBoxContainer = styled.div<OverlayBoxContainerProps>`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
    display: ${(props) => (props.show ? 'block' : 'none')};
`;
