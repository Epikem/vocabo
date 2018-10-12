import { darken, invert, lighten, transparentize } from 'polished';
import styled, { css } from '../../theme';

const ButtonBox = styled.button`${({ theme }) => css`
  background-color: ${theme.primaryColor};
  border: 1px solid ${theme.borderColor};
  padding: .5rem;
  color: ${theme.fontColor};
  font-size: ${theme.fontSize};

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