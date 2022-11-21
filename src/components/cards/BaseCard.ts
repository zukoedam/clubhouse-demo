import styled from '@emotion/styled';
import { Card, CardProps, Theme, withTheme } from '@phork/phorkit';
import { themes } from 'config/themes';

export type BaseCardProps = CardProps & {
  accessible?: boolean;
  actionable?: boolean;
  themeId?: Theme;
};

export const BaseCard = withTheme(styled(Card, {
  shouldForwardProp: (prop: string) => !['accessible', 'actionable'].includes(prop),
})<BaseCardProps>`
  background-color: ${({ themeId }) => themes[themeId!]['extreme-palette-background-color']};
  border-radius: 4px;
  color: ${({ themeId }) => themes[themeId!]['primary-palette-text-color']};
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  overflow: hidden;
  position: relative;

  ${({ actionable }) => (actionable ? 'cursor: pointer;' : '')}

  &:focus {
    outline: none;

    ${({ accessible, themeId }) =>
      accessible &&
      `
      &:after {
        border: 1px solid ${themes[themeId!]['secondary-palette-text-color']} !important;
        border-radius: 4px;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
      }
    `}
  }
`);
