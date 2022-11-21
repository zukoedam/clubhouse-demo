import { Flex, Typography, useThemeId } from '@phork/phorkit';
import { PfpRecord, PlaceholderRecord } from 'types/records';
import { PfpPlaceholder } from 'components/PfpPlaceholder';
import { useGridContext } from 'components/virtualizedGrid/context/useGridContext';
import { getPfpPlaceholder } from 'utils/pfp';
import { BaseGridCard } from './BaseGridCard';

export type PfpPlaceholderCardProps = {
  columnIndex: number;
  record?: PlaceholderRecord;
  rowIndex: number;
};

// to be used as a type guard
export const isPfpRecord = (record: PfpRecord | PlaceholderRecord | undefined): record is PfpRecord => {
  return record !== undefined && 'background' in record;
};

export function PfpPlaceholderCard({ columnIndex, record, rowIndex }: PfpPlaceholderCardProps): JSX.Element {
  const themeId = useThemeId();
  const { cardHeight, cardWidth, raised } = useGridContext();

  return (
    <BaseGridCard height={cardHeight} raised={raised} themeId={themeId} width={cardWidth}>
      <PfpPlaceholder
        placeholder={getPfpPlaceholder({ columnIndex, record: isPfpRecord(record) ? record : undefined, rowIndex })}
      />
      <Flex flexible alignItems="center" justifyContent="center">
        <Typography<'div'> as="div" size="2xlarge" variants={['blackout-rounded']} volume="quietest">
          Loading y00t
        </Typography>
      </Flex>
    </BaseGridCard>
  );
}

PfpPlaceholderCard.displayName = 'PfpPlaceholderCard';
