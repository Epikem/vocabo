import { darken, lighten, desaturate } from 'polished';
import styled from "styled-components";

const HeaderBox = styled.div`
  background-color: ${props => lighten(0.1,props.theme.primaryColor)};
  border: 1px solid ${props => darken(0.1, props.theme.primaryColor)};
`

const LogoBox = styled.div`
  transition: all .15s linear;
  transition-property: box-shadow, height, width, background-color, font-size, color;
`

const HeaderItem = styled.div`
  color: ${props => props.theme.fontColor};
  font-size: ${props => props.theme.titleSize};
  padding: .5rem;
  border-bottom: 1px solid transparent;

  :hover{
    border-bottom: 1px solid red;
  }
`

export { HeaderBox, LogoBox, HeaderItem };