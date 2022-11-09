import styled from '@emotion/styled';
import { GRID_CARD_WIDTH, GRID_CARD_HEIGHT } from 'config/sizes';
import { BaseCard, BaseCardProps } from './BaseCard';

export type BaseGridCardProps = BaseCardProps & {
  width?: number;
  height?: number;
  extraHeight?: number;
};

export const BaseGridCard = styled(BaseCard, {
  shouldForwardProp: (prop: string) => !['width', 'height', 'extraHeight'].includes(prop),
})<BaseGridCardProps>`
  width: ${({ width }) => width || GRID_CARD_WIDTH}px;
  height: ${({ extraHeight, height }) => height || GRID_CARD_HEIGHT + (extraHeight || 0)}px;
`;

BaseGridCard.displayName = 'BaseGridCard';
