import { darken, lighten } from "polished";
import * as React from 'react';
import { NavLink } from "react-router-dom";
import styled, { css } from "src/theme";
import { NavItemProps } from ".";

const NavItemBoxComponent: React.FunctionComponent<NavItemProps> = (({ right, ...rest }) => <NavLink {...rest} />);

export const NavItemBox = styled(NavItemBoxComponent)`
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


// export const NavItemBox = styled(NavLink).attrs<{right: boolean}>({ })`
//   ${({
//     theme: { navFontColor, titleSize, hoverEffect, navPadding }, right
//   }) => css`
//     margin-left: ${right? 'auto' : ''};
//     padding: ${navPadding};
//     user-select: none;
//     cursor: pointer;

//     color: ${navFontColor};
//     font-size: ${titleSize};
//     border-bottom: 2px solid transparent;
//     display: flex;

//     :hover {
//       border-bottom: 2px solid ${hoverEffect(navFontColor)};
//       color: ${hoverEffect(navFontColor)};
//     }

//     :focus {
//       outline: none;
//       border-bottom: 2px solid ${hoverEffect(navFontColor)};
//       color: ${hoverEffect(navFontColor)};
//     }
//   `};
// `;
