import { Rhythm } from '@phork/phorkit';
import { Y00Ts00Icon } from 'icons/Y00Ts00Icon';
import { MainContentAlert, MainContentAlertProps } from '../MainContentAlert';

export type EmptyGridContainerProps = Omit<MainContentAlertProps, 'icon'> & {
  icon?: MainContentAlertProps['icon'];
  mx?: number;
  my?: number;
};

export function EmptyGridContainer({
  icon,
  message = "There's nothing to see here",
  mx = 0,
  my = 0,
  ...props
}: EmptyGridContainerProps): JSX.Element {
  return (
    <Rhythm grouped mb={my + 1} mt={my} mx={mx}>
      <MainContentAlert icon={icon || Y00Ts00Icon} message={message} {...props} />
    </Rhythm>
  );
}

EmptyGridContainer.displayName = 'EmptyGridContainer';
