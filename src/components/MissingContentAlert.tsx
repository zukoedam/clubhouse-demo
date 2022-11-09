import { MainContentAlert, MainContentAlertProps } from 'components/MainContentAlert';
import { Y00Ts00Icon } from 'icons/Y00Ts00Icon';

export type MissingContentAlertProps = Omit<MainContentAlertProps, 'icon'>;

export function MissingContentAlert({
  color = 'primary',
  message,
  ...props
}: MissingContentAlertProps): React.ReactElement {
  return <MainContentAlert color={color} icon={Y00Ts00Icon} message={message} {...props} />;
}

MissingContentAlert.displayName = 'MissingContentAlert';
