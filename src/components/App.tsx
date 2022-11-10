import { AccessibilityProvider, Modals, Theme, ThemeProvider } from '@phork/phorkit';
import { AppContent } from 'components/AppContent';

export type AppProps = {
  themeId: Theme;
};

export const App = ({ themeId }: AppProps): React.ReactElement => (
  <ThemeProvider themeId={themeId}>
    <AccessibilityProvider>
      <Modals>
        <AppContent />
      </Modals>
    </AccessibilityProvider>
  </ThemeProvider>
);

App.displayName = 'App';
