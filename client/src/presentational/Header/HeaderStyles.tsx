import { darken, lighten, desaturate } from 'polished';
import styled from "styled-components";

const HeaderBox = styled.div`
  background-color: ${props => lighten(0.1,props.theme.primaryColor)};
  border: 1px solid ${props => darken(0.1, props.theme.primaryColor)};
  padding: 1rem;
  color: ${props => props.theme.fontColor};
  font-size: ${props => props.theme.titleSize};
`

const LogoBox = styled.div`
  font-size: ${props => props.theme.titleSize};
  color: ${props => props.theme.fontColor};
  transition: all .15s linear;
  transition-property: box-shadow, height, width, background-color, font-size, color;
`

export { HeaderBox, LogoBox };