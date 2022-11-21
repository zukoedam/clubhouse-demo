import { config } from '@phork/phorkit';

export const LAYOUT_GRID_BASE = parseInt(config['layout-grid-base'].replace(/[^\d]/g, ''));

export const PAPER_TOP_OFFSET = 0;
export const PAPER_SIDE_OFFSET = 0;

export const SMALL_PAPER_TOP_OFFSET = 0;
export const SMALL_PAPER_SIDE_OFFSET = 0;

export const GRID_CARD_WIDTH = 306;
export const GRID_CARD_HEIGHT = 360;

// the space on either size of the grid item
export const GRID_MX = 7;
export const GRID_MY = 7;

export const MAX_GRID_COLUMNS = 5;

// the grid should be at least one card wide
export const MIN_GRID_WIDTH = GRID_CARD_WIDTH + GRID_MX * LAYOUT_GRID_BASE * 2;
export const MAX_GRID_WIDTH = MAX_GRID_COLUMNS * (GRID_CARD_WIDTH + GRID_MX * LAYOUT_GRID_BASE * 2);

export const ALERT_DEFAULT_SIZE = 400;
export const ALERT_MINIMUM_SIZE = 200;
