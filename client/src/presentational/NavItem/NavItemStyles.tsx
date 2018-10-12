import { darken, lighten } from "polished";
import { NavLink } from "react-router-dom";
import styled, { css } from "src/theme";

export const NavItemBox = styled(NavLink).attrs<{right: boolean}>({ })`
  ${({
    theme: { navFontColor, titleSize, hoverEffect, navPadding }, right
  }) => css`
    margin-left: ${right? 'auto' : ''};
    padding: ${navPadding};
    user-select: none;
    cursor: pointer;

    color: ${navFontColor};
    font-size: ${titleSize};
    border-bottom: 2px solid transparent;
    display: flex;

    :hover {
      border-bottom: 2px solid ${hoverEffect(navFontColor)};
      color: ${hoverEffect(navFontColor)};
    }

    :focus {
      outline: none;
      border-bottom: 2px solid ${hoverEffect(navFontColor)};
      color: ${hoverEffect(navFontColor)};
    }
  `};
`;
