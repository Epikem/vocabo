import * as React from 'react';
import { NavItemBox } from './NavItemStyles';

interface INavItemProps {
  to: string;
  children: any;
}

export const NavItem = (props: INavItemProps) => {
  return (
    <NavItemBox {...props}>
      {props.children}
    </NavItemBox>
  );
};