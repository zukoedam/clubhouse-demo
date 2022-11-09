import { useEffect, useRef, useState } from 'react';
import { Flex, makeCancelable, Typography, useThemeId } from '@phork/phorkit';
import styles from '@phork/phorkit/styles/modules/common/Utils.module.css';
import { PfpRecord } from 'types/records';
import { GRID_CARD_WIDTH } from 'config/sizes';
import { PfpPlaceholder } from 'components/PfpPlaceholder';
import { useGridContext } from 'components/virtualizedGrid/context';
import { getRandomPfp } from 'utils/pfp';
import { BaseGridCard } from './BaseGridCard';

const PIXEL_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export type PfpCardProps = {
  columnIndex: number;
  record: PfpRecord;
  rowIndex: number;
};

export function PfpCard({ columnIndex, record: { image, name }, rowIndex }: PfpCardProps): JSX.Element {
  const themeId = useThemeId();
  const { cardHeight, cardWidth, raised } = useGridContext();

  const [imageLoaded, setImageLoaded] = useState<boolean | undefined>();
  const cancelLoaderRef = useRef<() => void>();

  // on initial load load the PFP image in the background
  const loaderImage = (element: HTMLImageElement) => {
    const { promise, cancel } = makeCancelable<HTMLImageElement>(
      new Promise((resolve, reject) => {
        if (element) {
          element.onload = () => resolve(element);
          element.onerror = reject;
          element.src = image;
        }
      }),
    );

    cancelLoaderRef.current = cancel;
    promise
      .then(() => setImageLoaded(true))
      .catch(() => {
        // this probably means the promise was intentionally cancelled
      });
  };

  // cancel the loader on unmount
  useEffect(() => cancelLoaderRef.current);

  return (
    <BaseGridCard height={cardHeight} raised={raised} themeId={themeId} width={cardWidth}>
      <PfpPlaceholder placeholder={getRandomPfp(rowIndex, columnIndex)}>
        {!imageLoaded && <img alt="" className={styles.visuallyHidden} ref={loaderImage} />}
        <img alt={name} height={GRID_CARD_WIDTH} src={imageLoaded ? image : PIXEL_IMG} width={GRID_CARD_WIDTH} />
      </PfpPlaceholder>
      <Flex flexible alignItems="center" justifyContent="center">
        <Typography<'div'> as="div" size="2xlarge" weight="bold">
          {name}
        </Typography>
      </Flex>
    </BaseGridCard>
  );
}
