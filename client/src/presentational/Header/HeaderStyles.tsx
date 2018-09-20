import { darken, lighten, desaturate } from 'polished';
import styled, { theme } from '../../theme';

const HeaderBox = styled.div`
  background-color: ${props => lighten(0.1,props.theme.primaryColor)};
`

const LogoBox = styled.div`
  transition: all .15s linear;
  transition-property: box-shadow, height, width, background-color, font-size, color;
  display: flex;
`

const HeaderItem = styled.div`
  color: ${theme('navFontColor')};
  font-size: ${theme('titleSize')};
  border-bottom: 2px solid transparent;
  display: flex;

  :hover{
    border-bottom: 2px solid ${theme('navFontColor')};
  }

`

export { HeaderBox, LogoBox, HeaderItem };