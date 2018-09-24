import { darken, lighten } from "polished";
import { NavLink } from "react-router-dom";
import styled, { css } from "../../theme";

export const NavItemBox = styled(NavLink)`
  ${({
    theme: { themeName, fontColor, navFontColor, titleSize, hoverEffect, activeEffect }
  }) => css`
    padding: 0.5rem;
    user-select: none;
    cursor: pointer;

    color: ${navFontColor};
    font-size: ${titleSize};
    border-bottom: 2px solid transparent;
    display: flex;

    :hover {
      border-bottom: 2px solid ${themeName === 'light' ? darken(0.2, navFontColor) : lighten(0.3, navFontColor)};
    }

    :hover {
      color: ${themeName === 'light' ? darken(0.2, navFontColor) : lighten(0.3, navFontColor)};
    }

    :active {
      color: ${activeEffect(navFontColor)};
    }
  `};
`;
