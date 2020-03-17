import { darken, lighten } from "polished";
import * as React from 'react';
import styled, { css } from "src/theme";
import { MenuPanelProps } from ".";

const MenuPanelBoxComponent: React.FunctionComponent<MenuPanelProps> = (({ visible, ...rest }) => <div {...rest} />);

export const MenuPanelBox = styled(MenuPanelBoxComponent)`
  ${({
    theme: { navFontColor, titleSize, hoverEffect, navPadding, primaryColor, borderColor }, visible
  }) => css`
    background-color: ${primaryColor};
    margin-left: ${visible? 'auto' : ''};
    /* padding: ${navPadding}; */
    user-select: none;
    /* visibility: ${visible? 'visible' : 'hidden'}; */

    color: ${navFontColor};
    font-size: ${titleSize};
    /* display: flex; */
    border: 1px solid ${borderColor};
    transition: right 1s ease-in-out;

    width: 20%;
    position: fixed;
    right: ${visible? '0' : '-25%'};
    top: 0;
    height: 100%;

    /* :hover {
      border-bottom: 2px solid ${hoverEffect(navFontColor)};
      color: ${hoverEffect(navFontColor)};
    }

    :focus {
      outline: none;
      border-bottom: 2px solid ${hoverEffect(navFontColor)};
      color: ${hoverEffect(navFontColor)};
    } */
  `};
`;
