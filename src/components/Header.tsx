import styled from '@emotion/styled';
import { ColoredDivider, Flex, Rhythm, Typography } from '@phork/phorkit';
import { CLUB_COLORS, CLUB_NAME } from 'config/club';
import { MAX_GRID_WIDTH } from 'config/sizes';
import { ColorBox } from 'components/ColorBox';
import { Y00TsIcon } from 'icons/Y00TsIcon';

const HeaderContainer = styled(Rhythm)`
  align-self: center;
  max-width: ${MAX_GRID_WIDTH}px;
  position: relative;
  width: 100%;
`;

export type HeaderProps = {
  height: number;
};

export function Header({ height }: HeaderProps): JSX.Element {
  const logoOffset = Math.round(height / 20);

  return (
    <HeaderContainer grouped px={7}>
      <Flex full alignItems="center" direction="row" justifyContent="center">
        <Rhythm mt={logoOffset}>
          <Y00TsIcon height={height * 0.6} />
        </Rhythm>
        <Rhythm grouped mx={4} style={{ height: Math.round(height * 0.4) }}>
          <ColoredDivider colorId="P00" orientation="vertical" />
        </Rhythm>
        <Typography heading="h2" variants="line-height-normal">
          {CLUB_NAME}
        </Typography>
        <Rhythm ml={3}>
          <Flex data-testid="colors" direction="row">
            {CLUB_COLORS.map(color => (
              <ColorBox color={color} key={color} />
            ))}
          </Flex>
        </Rhythm>
      </Flex>
    </HeaderContainer>
  );
}
