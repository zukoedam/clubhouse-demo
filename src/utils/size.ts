import {
  ALERT_DEFAULT_SIZE,
  ALERT_MINIMUM_SIZE,
  PAPER_TOP_OFFSET,
  PAPER_SIDE_OFFSET,
  SMALL_PAPER_TOP_OFFSET,
  SMALL_PAPER_SIDE_OFFSET,
  GRID_CARD_WIDTH,
  GRID_CARD_HEIGHT,
  GRID_MX,
  GRID_MY,
  LAYOUT_GRID_BASE,
} from 'config/sizes';
import { viewports } from 'config/viewports';

export const showMobileLayout = (width = 0): boolean => width <= viewports.small.max;
export const showDesktopLayout = (width = 0): boolean => width >= viewports.medium.min;

export const getPaperTopOffset = (width = 0): number =>
  width <= viewports.small.max ? SMALL_PAPER_TOP_OFFSET : PAPER_TOP_OFFSET;

export const getPaperSideOffset = (width = 0): number =>
  width <= viewports.small.max ? SMALL_PAPER_SIDE_OFFSET : PAPER_SIDE_OFFSET;

export const getAlertSize = (width?: number): number =>
  Math.max(ALERT_MINIMUM_SIZE, width ? Math.min(width * 0.8, ALERT_DEFAULT_SIZE) : ALERT_DEFAULT_SIZE);

export const getColumnWidth = ({
  cardWidth = GRID_CARD_WIDTH,
  mx = GRID_MX,
}: {
  cardWidth?: number;
  mx?: number;
}): number => cardWidth + mx * LAYOUT_GRID_BASE * 2;

export const getRowHeight = ({
  cardHeight = GRID_CARD_HEIGHT,
  my = GRID_MY,
}: {
  cardHeight?: number;
  my?: number;
}): number => cardHeight + my * LAYOUT_GRID_BASE * 2;
