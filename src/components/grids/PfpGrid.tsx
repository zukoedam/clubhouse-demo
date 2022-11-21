import { Fragment } from 'react';
import { PfpRecord } from 'types/records';
import { PagePaper } from 'components/PagePaper';
import { PfpCard } from 'components/cards/PfpCard';
import { PfpPlaceholderCard } from 'components/cards/PfpPlaceholderCard';
import { EmptyGridContainer } from 'components/virtualizedGrid/EmptyGridContainer';
import { ListPageGridLoader } from 'components/virtualizedGrid/ListPageGridLoader';
import { VirtualizedGrid, VirtualizedGridProps } from 'components/virtualizedGrid/VirtualizedGrid';
import { useLoadPfpList } from 'hooks/useLoadPfpList';

export type PfpGridProps = Omit<VirtualizedGridProps<PfpRecord>, 'component' | 'placeholder' | 'records'>;

export function PfpGrid(props: PfpGridProps): JSX.Element {
  const { cards, error, loading } = useLoadPfpList();

  return (
    <Fragment>
      {cards.length > 0 && (
        <VirtualizedGrid<PfpRecord>
          component={PfpCard}
          placeholder={PfpPlaceholderCard}
          raised={40}
          records={cards}
          {...props}
        />
      )}

      {!loading && !cards?.length && (
        <PagePaper centered flexible full>
          <EmptyGridContainer message={error || 'The y00ts ran off. Please come back later.'} />
        </PagePaper>
      )}

      <ListPageGridLoader loading={loading} placeholder={PfpPlaceholderCard} raised={40} {...props} />
    </Fragment>
  );
}
