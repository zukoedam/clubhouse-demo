import styled from '@emotion/styled';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { MainPanel, PanelContainer, PermanentStackPanel, useGetHeight } from '@phork/phorkit';
import { CLUB_NAME } from 'config/club';
import { MIN_GRID_WIDTH } from 'config/sizes';
import { Header } from 'components/Header';
import { PfpGrid } from 'components/grids/PfpGrid';

const PANEL_HEIGHT = 100;

// a fix for mobile browsers because 100vh includes browser chrome
const ViewportPanelContainer = styled(PanelContainer)`
  height: 100% !important;
  min-height: 100% !important;
  max-height: 100% !important;
  min-width: ${MIN_GRID_WIDTH}px;
`;

export function Home(): JSX.Element {
  const height = useGetHeight();

  return (
    <Fragment>
      <Helmet>
        <title>{CLUB_NAME}</title>
      </Helmet>

      <ViewportPanelContainer viewport orientation="horizontal">
        <PermanentStackPanel data-testid="header" height={PANEL_HEIGHT} position="top">
          <Header height={PANEL_HEIGHT} />
        </PermanentStackPanel>
        <MainPanel data-testid="content">
          {height !== undefined && height > 0 && <PfpGrid height={height - PANEL_HEIGHT} />}
        </MainPanel>
      </ViewportPanelContainer>
    </Fragment>
  );
}
