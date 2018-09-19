import * as React from 'react';
import { NavItemBox } from './NavItemStyles';

interface INavItemProps {
  to: string;
}

export const NavItem : React.SFC<INavItemProps> = (props) => {
  return (
    <NavItemBox {...props}>
      {props.children}
    </NavItemBox>
  );
};