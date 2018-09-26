import { darken, invert, lighten, transparentize } from 'polished';
import styled, { css } from '../../theme';

const ButtonBox = styled.button`${({ theme }) => css`
  background-color: ${props => props.theme.primaryColor};
  border: 1px solid ${theme.borderColor};
  padding: .5rem;
  color: ${props => props.theme.fontColor};
  font-size: ${props => props.theme.fontSize};
  transition: all .15s linear;
  transition-property: box-shadow, height, width, background-color, font-size, color;

  :hover{
    transition: background-color .15s linear;
    background-color: ${theme.hoverEffect(theme.primaryColor)};
  }

  :active{
    transition: background-color .01s linear;
    background-color: ${theme.activeEffect(theme.primaryColor)};
  }
`}`

export { ButtonBox };