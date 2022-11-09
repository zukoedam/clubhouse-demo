import { ColoredDivider, Flex, Rhythm, Typography } from '@phork/phorkit';
import { CLUB_COLORS, CLUB_NAME } from 'config/club';
import { ColorBox } from 'components/ColorBox';
import { Y00TsIcon } from 'icons/Y00TsIcon';

export type HeaderProps = {
  height: number;
};

export function Header({ height }: HeaderProps): JSX.Element {
  return (
    <Flex full alignItems="center" direction="row" justifyContent="center">
      <Rhythm mt={Math.round(height / 20)}>
        <Y00TsIcon height={height * 0.6} />
      </Rhythm>
      <Rhythm grouped mx={4} style={{ height: Math.round(height * 0.4) }}>
        <ColoredDivider colorId="P00" orientation="vertical" />
      </Rhythm>
      <Typography heading="h1">{CLUB_NAME}</Typography>
      <Rhythm ml={3}>
        <Flex data-testid="colors" direction="row">
          {CLUB_COLORS.map(color => (
            <ColorBox color={color} key={color} />
          ))}
        </Flex>
      </Rhythm>
    </Flex>
  );
}
