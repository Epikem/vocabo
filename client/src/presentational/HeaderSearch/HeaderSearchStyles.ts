import styled, { css } from "src/theme";

const HeaderSearchInput = styled.input`
  ${({ theme }) => css`
    margin: auto;
    padding: ${theme.navPadding};
    border-radius: ${theme.borderRadius};
    width: 80%;
    border: 1px solid ${theme.borderColor};
    background-color: ${theme.primaryColor};
    color: ${theme.navFontColor};
    :focus {
      color: ${theme.hoverEffect(theme.navFontColor)};
      border-color: ${theme.hoverEffect(theme.borderColor)};
    }
  `};
`;

export { HeaderSearchInput };
