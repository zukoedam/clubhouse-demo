import { useMemo } from 'react';
import { useGetSize } from '@phork/phorkit';
import { PlaceholderRecord } from 'types/records';
import { GRID_CARD_WIDTH, GRID_CARD_HEIGHT, MAX_GRID_COLUMNS } from 'config/sizes';
import { FadingLoader } from 'components/FadingLoader';
import { Shimmer } from 'components/Shimmer';
import { VirtualizedGrid, VirtualizedGridProps } from 'components/virtualizedGrid/VirtualizedGrid';

const allLoaderCards: PlaceholderRecord[] = new Array(10).fill(null).map((_, i) => ({ id: `loader-${i}` }));

export type ListPageGridLoaderProps = Omit<
  VirtualizedGridProps<PlaceholderRecord>,
  'component' | 'height' | 'placeholder' | 'records' | 'width'
> & {
  loading: boolean;
  maxCards?: number;
  placeholder: NonNullable<VirtualizedGridProps<PlaceholderRecord>['placeholder']>;
};

export const ListPageGridLoader = ({
  cardHeight = GRID_CARD_HEIGHT,
  cardWidth = GRID_CARD_WIDTH,
  loading,
  maxCards,
  maxColumns = MAX_GRID_COLUMNS,
  placeholder,
  raised,
}: ListPageGridLoaderProps): JSX.Element => {
  const { width, height } = useGetSize();

  const loaderCards = useMemo(
    () =>
      maxCards !== undefined && maxCards < allLoaderCards.length ? allLoaderCards.slice(0, maxCards) : allLoaderCards,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
