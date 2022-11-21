import { css, cx } from '@emotion/css';
import { useCallback, useMemo } from 'react';
import * as React from 'react';
import { FixedSizeGrid, FixedSizeGrid as Grid, FixedSizeGridProps as GridProps } from 'react-window';
import { useThemeId, useGetSize } from '@phork/phorkit';
import styles from '@phork/phorkit/styles/modules/common/Scrollbar.module.css';
import { GRID_CARD_HEIGHT, GRID_CARD_WIDTH, GRID_MX, GRID_MY, MAX_GRID_COLUMNS, MIN_GRID_WIDTH } from 'config/sizes';
import { useGridAxisCounts } from 'hooks/useGridAxisCounts';
import { getPaperTopOffset } from 'utils/size';
import { VirtualizedGridItem } from './VirtualizedGridItem';
import { BaseGridRecordType, GridContextValue, GridProvider } from './context';

const hideHorizontalOverflow = css`
  overflow-x: hidden !important;
`;

export type VirtualizedGridProps<RecordType extends BaseGridRecordType> = Pick<
  GridContextValue<RecordType>,
  'cardHeight' | 'cardWidth' | 'component' | 'mx' | 'my' | 'placeholder' | 'raised'
> & {
  allowHorizontalOverflow?: boolean;
  finished?: boolean;
  height?: number;
  horizontalSpacing?: number;
  infinite?: boolean;
  maxColumns?: number;
  minWidth?: number;
  onItemsRendered?: GridProps['onItemsRendered'];
  onScroll?: GridProps['onScroll'];
  records: RecordType[];
  width?: number;
};

function VirtualizedGridBase<RecordType extends BaseGridRecordType>(
  {
    allowHorizontalOverflow,
    cardHeight = GRID_CARD_HEIGHT,
    cardWidth = GRID_CARD_WIDTH,
    component,
    finished,
    height,
    infinite,
    maxColumns = MAX_GRID_COLUMNS,
    minWidth = MIN_GRID_WIDTH,
    mx = GRID_MX,
    my = GRID_MY,
    onItemsRendered,
    onScroll,
    placeholder,
    raised,
    records,
    width: containerWidth,
  }: VirtualizedGridProps<RecordType>,
  forwardedRef: React.ForwardedRef<FixedSizeGrid<RecordType[]>>,
) {
  const themeId = useThemeId();
  const { width, height: gridHeight } = useGetSize();

  const { columnCount, columnWidth, gridWidth, rowCount, rowHeight } = useGridAxisCounts({
    cardWidth,
    containerWidth: containerWidth || width || 0,
    itemCount: records.length,
    maxColumns,
    minWidth,
  });

  /**
   * If the last row of items isn't a full row and the records haven't
   * finished loading then clip the records so that it ends on a
   * full row.
   */
  const clippedRecords =
    infinite && !finished && records.length % columnCount
      ? records.slice(0, records.length - (records.length % columnCount))
      : records;

  const leftShift = Math.floor((gridWidth - columnWidth * columnCount) / 2);
  const topShift = getPaperTopOffset(width || 0);

  const itemKey = useCallback(
    ({ data, columnIndex, rowIndex }: { data: RecordType[]; columnIndex: number; rowIndex: number }) => {
      const index = columnCount * rowIndex + columnIndex;
      return (data[index] && data[index].id) || `other-${index}`;
    },
    [columnCount],
  );

  return useMemo(
    () => (
      <GridProvider
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        columnCount={columnCount}
        component={component}
        leftShift={leftShift}
        mx={mx}
        my={my}
        placeholder={placeholder}
        raised={raised}
        topShift={topShift}
      >
        <Grid<RecordType[]>
          useIsScrolling
          className={cx(
            styles.scrollbar,
            styles['scrollbar--primary'],
            styles[`scrollbar--${themeId}`],
            allowHorizontalOverflow || hideHorizontalOverflow,
          )}
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={height || gridHeight || 0}
          itemData={clippedRecords}
          itemKey={itemKey}
          onItemsRendered={onItemsRendered}
          onScroll={onScroll}
          ref={forwardedRef}
          rowCount={rowCount}
          rowHeight={rowHeight}
          width={gridWidth}
        >
          {VirtualizedGridItem}
        </Grid>
      </GridProvider>
    ),
    [
      allowHorizontalOverflow,
      cardHeight,
      cardWidth,
      clippedRecords,
      columnCount,
      columnWidth,
      component,
      forwardedRef,
      gridHeight,
      gridWidth,
      height,
      itemKey,
      leftShift,
      mx,
      my,
      onItemsRendered,
      onScroll,
      placeholder,
      raised,
      rowCount,
      rowHeight,
      themeId,
      topShift,
    ],
  );
}

export const VirtualizedGrid = React.forwardRef(VirtualizedGridBase) as <RecordType extends BaseGridRecordType>(
  p: VirtualizedGridProps<RecordType>,
) => JSX.Element;

(VirtualizedGrid as React.NamedExoticComponent).displayName = 'VirtualizedGrid';
