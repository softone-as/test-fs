import styled from 'styled-components';

export const AccordionHeader = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .rotate-icon {
        font-size: 20px;
    }

    &[aria-expanded='true'] .rotate-icon {
        transform: rotate(180deg);
        transition: all 0.3s ease-in-out;
    }
`;
