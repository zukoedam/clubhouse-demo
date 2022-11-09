import styled from '@emotion/styled';

export type ColorBoxProps = {
  color: string;
  size?: number;
};

export const ColorBox = styled('div', {
  shouldForwardProp: (prop: string) => !['size', 'color'].includes(prop),
})<ColorBoxProps>`
  ${({ color, size = 16 }) => `
  background-color: ${color};
  border: 1px solid currentColor;
  margin-left: -1px;
  width: ${size}px;
  height: ${size}px;
`}
`;

ColorBox.displayName = 'ColorBox';
