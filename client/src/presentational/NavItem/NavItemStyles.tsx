import { darken, lighten } from "polished";
import { NavLink } from "react-router-dom";
import styled, { css } from "../../theme";

export const NavItemBox = styled(NavLink)`
  ${({
    theme: { navFontColor, titleSize, hoverEffect }
  }) => css`
    padding: 0.5rem;
    user-select: none;
    cursor: pointer;

    color: ${navFontColor};
    font-size: ${titleSize};
    border-bottom: 2px solid transparent;
    display: flex;

    :hover {
      border-bottom: 2px solid ${hoverEffect(navFontColor)};
    }

    :hover {
      color: ${hoverEffect(navFontColor)};
    }
  `};
`;
