import styled from '@emotion/styled';
import { GRID_CARD_WIDTH } from 'config/sizes';

export const PfpPlaceholder = styled('div', {
  shouldForwardProp: (prop: string) => prop !== 'placeholder',
})<{ placeholder: string }>`
  ${({ placeholder }) => `
    background: url('${placeholder}') no-repeat;
    background-size: ${GRID_CARD_WIDTH}px ${GRID_CARD_WIDTH}px;
    width: ${GRID_CARD_WIDTH}px;
    height: ${GRID_CARD_WIDTH}px;
`}
`;
