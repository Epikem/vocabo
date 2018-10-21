import styled, { css } from '../../theme';

export const Card = styled.div`${({ theme }) => css`
  background-color: ${theme.primaryColor};
  border: 1px solid ${theme.borderColor};
  padding: .5rem;
  color: ${theme.fontColor};
  font-size: ${theme.fontSize};
  border-radius: ${theme.borderRadius};
`}`
