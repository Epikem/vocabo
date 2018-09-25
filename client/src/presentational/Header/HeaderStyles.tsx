import { lighten } from 'polished';
import styled from '../../theme';

const HeaderBox = styled.div`
  background-color: ${props => lighten(0.1, props.theme.primaryColor)};
`

const LogoBox = styled.div`
  transition: all .15s linear;
  transition-property: box-shadow, height, width, background-color, font-size, color;
  display: flex;
`

export { HeaderBox, LogoBox };