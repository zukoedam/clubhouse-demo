import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import {
  Paper,
  PaperProps,
  Rhythm,
  StateColor,
  SvgIconProps,
  Theme,
  ThemeColors,
  Typography,
  themes,
  useGetWidth,
  useThemeId,
} from '@phork/phorkit';
import focusRing from '@phork/phorkit/styles/modules/common/FocusRing.module.css';
import { getAlertSize } from 'utils/size';

const getColorKey = (color: MainContentAlertProps['color']): PaperProps['color'] => {
  if (color === 'primary') return 'accent';
  if (color === 'warning') return 'warning';
  if (color === 'danger') return 'danger';
  return 'secondary';
};

const StyledLink = styled.a<{ color: PaperProps['color']; themeId: Theme }>`
  ${({ color, themeId }) => `
    border-radius: 100%;
    display: block;
    position: relative;

    --focus-ring-color: ${
      color === 'accent' ? 'var(--phork-accent-color)' : themes[themeId][`color-${color}` as keyof ThemeColors]
    };
    --focus-ring-size: 16px;

    &:active {
      --focus-ring-opacity: 0.4;
  `}
`;

const AlertContainer = styled(Paper, {
  shouldForwardProp: (prop: string) => !['size'].includes(prop),
})<{ size: number }>`
  ${({ size }) => `
    align-items: center;
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    height: ${size}px;
    justify-content: center;
    width: ${size}px;
  `}
`;

export type MainContentAlertProps = Omit<PaperProps, 'children' | 'color'> & {
  color?: Omit<StateColor, 'success'>;
  href?: string;
  icon: React.FC<SvgIconProps>;
  message: string;
  raised?: boolean;
  size?: number;
};

export const MainContentAlert = ({
  color,
  href,
  icon: Icon,
  message,
  raised,
  size: initSize,
  ...props
}: MainContentAlertProps): React.ReactElement => {
  const themeId = useThemeId();
  const width = useGetWidth();
  const size = initSize || getAlertSize(width);
  const iconSize = Math.round(size / 3);

  const alert = (
    <AlertContainer color={getColorKey(color)} size={size} {...props}>
      <Rhythm mb={6}>
        <Icon size={iconSize} style={{ flex: 'none' }} />
      </Rhythm>
      <Typography align="center" size="xlarge">
        {message}
      </Typography>
    </AlertContainer>
  );

  return href ? (
    <StyledLink
      className={cx(focusRing.focusRing, focusRing['focusRing--hoverable'])}
      color={getColorKey(color)}
      href={href}
      themeId={themeId}
    >
      {alert}
    </StyledLink>
  ) : (
    alert
  );
};

MainContentAlert.displayName = 'MainContentAlert';
