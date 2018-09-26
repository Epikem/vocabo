import { darken, invert, lighten, transparentize } from 'polished';
import styled, { css } from '../../theme';

const HeaderBox = styled.div`${({ theme }) => css`
  background-color: ${theme.primaryColor};
  border-bottom: 1px solid ${theme.borderColor};
`}`;

const LogoBox = styled.div`
  transition: all .15s linear;
  transition-property: box-shadow, height, width, background-color, font-size, color;
  display: flex;
`

export { HeaderBox, LogoBox };