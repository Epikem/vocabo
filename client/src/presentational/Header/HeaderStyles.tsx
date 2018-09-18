import { darken, lighten, desaturate } from 'polished';
import styled, { theme } from '../../theme';

const HeaderBox = styled.div`
  background-color: ${props => lighten(0.1,props.theme.primaryColor)};
`

const LogoBox = styled.div`
  transition: all .15s linear;
  transition-property: box-shadow, height, width, background-color, font-size, color;
`

const HeaderItem = styled.div`
  color: ${theme('fontColor')};
  font-size: ${theme('titleSize')};
  padding: .5rem;
  border-bottom: 2px solid transparent;

  :hover{
    border-bottom: 2px solid ${theme('fontColor')};
  }
  
`

export { HeaderBox, LogoBox, HeaderItem };