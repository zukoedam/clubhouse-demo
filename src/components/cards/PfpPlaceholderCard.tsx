import { Flex, Typography, useThemeId } from '@phork/phorkit';
import { PfpPlaceholder } from 'components/PfpPlaceholder';
import { useGridContext } from 'components/virtualizedGrid/context/useGridContext';
import { getRandomPfp } from 'utils/pfp';
import { BaseGridCard } from './BaseGridCard';

export type PfpPlaceholderCardProps = {
  rowIndex: number;
  columnIndex: number;
};

export function PfpPlaceholderCard({ columnIndex, rowIndex }: PfpPlaceholderCardProps): JSX.Element {
  const themeId = useThemeId();
  const { cardHeight, cardWidth, raised } = useGridContext();

  return (
    <BaseGridCard height={cardHeight} raised={raised} themeId={themeId} width={cardWidth}>
      <PfpPlaceholder placeholder={getRandomPfp(rowIndex, columnIndex)} />
      <Flex flexible alignItems="center" justifyContent="center">
        <Typography<'div'> as="div" size="2xlarge" variants={['blackout-rounded']} volume="quietest">
          Loading y00t ...
        </Typography>
      </Flex>
    </BaseGridCard>
  );
}

PfpPlaceholderCard.displayName = 'PfpPlaceholderCard';
