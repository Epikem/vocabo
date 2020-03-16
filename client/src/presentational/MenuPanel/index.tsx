import * as React from 'react';
import { MenuPanelBox } from './MenuPanelStyles';

export interface MenuPanelProps{
  visible?: boolean;
  children?: React.ReactNode;
}

export const MenuPanel : React.SFC<MenuPanelProps> = ({children, visible=false, ...rest}: MenuPanelProps) => {
  return (
    <MenuPanelBox visible={visible} {...rest}>
      {children}
    </MenuPanelBox>
  );
};