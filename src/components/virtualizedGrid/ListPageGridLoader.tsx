import { useMemo } from 'react';
import { useGetSize } from '@phork/phorkit';
import { PlaceholderRecord } from 'types/records';
import { GRID_CARD_WIDTH, GRID_CARD_HEIGHT, MAX_GRID_COLUMNS, GRID_MX, GRID_MY } from 'config/sizes';
import { FadingLoader } from 'components/FadingLoader';
import { Shimmer } from 'components/Shimmer';
import { VirtualizedGrid, VirtualizedGridProps } from 'components/virtualizedGrid/VirtualizedGrid';
import { getColumnWidth, getRowHeight } from 'utils/size';

export type ListPageGridLoaderProps = Omit<
  VirtualizedGridProps<PlaceholderRecord>,
  'component' | 'height' | 'placeholder' | 'records' | 'width'
> & {
  loading: boolean;
  maxCards?: number;
  minCards?: number;
  placeholder: NonNullable<VirtualizedGridProps<PlaceholderRecord>['placeholder']>;
};

export const ListPageGridLoader = ({
  cardHeight = GRID_CARD_HEIGHT,
  cardWidth = GRID_CARD_WIDTH,
  loading,
  maxCards = 40,
  maxColumns = MAX_GRID_COLUMNS,
  minCards = 6,
  mx = GRID_MX,
  my = GRID_MY,
  placeholder,
  raised,
}: ListPageGridLoaderProps): JSX.Element => {
  const { width, height } = useGetSize();

  const loaderCards = useMemo((): PlaceholderRecord[] => {
    let numCards = minCards;
    if (width && height) {
      const columnWidth = getColumnWidth({ cardWidth, mx });
      const rowHeight = getRowHeight({ cardHeight, my });
      const cardsPerPage = Math.ceil(width / columnWidth) * Math.ceil(height / rowHeight);
      numCards = Math.max(minCards, Math.min(maxCards, cardsPerPage));
    }
    return new Array(numCards).fill(null).map((_, i) => ({ id: `loader-${i}` }));
  }, [minCards, width, height, cardWidth, mx, cardHeight, my, maxCards]);

  return (
    <FadingLoader loading={loading} style={{ position: 'absolute', top: 0, left: 0 }}>
      <VirtualizedGrid<PlaceholderRecord>
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        component={placeholder}
        height={height}
        maxColumns={maxColumns}
        placeholder={placeholder}
        raised={loading ? raised : false}
        records={loaderCards}
        width={width}
      />

      <Shimmer />
    </FadingLoader>
  );
};

ListPageGridLoader.displayName = 'ListPageGridLoader';
