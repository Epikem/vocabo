import { darken, lighten } from 'polished';
import styled from '../../theme';

const ButtonBox = styled.button`
  background-color: ${props => props.theme.primaryColor};
  border: 1px solid ${props => darken(0.1, props.theme.primaryColor)};
  padding: .5rem;
  color: ${props => props.theme.fontColor};
  font-size: ${props => props.theme.fontSize};
  transition: all .15s linear;
  transition-property: box-shadow, height, width, background-color, font-size, color;

  :hover{
    transition: background-color .15s linear;
    background-color: ${props => lighten(0.1, props.theme.primaryColor)};
  }

  :active{
    transition: background-color .01s linear;
    background-color: ${props => darken(0.1, props.theme.primaryColor)};
  }
`

export { ButtonBox };