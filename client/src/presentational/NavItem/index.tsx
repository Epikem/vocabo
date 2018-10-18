import * as React from 'react';
import { LinkProps } from 'react-router-dom';
import { NavItemBox } from './NavItemStyles';

export interface NavItemProps extends LinkProps {
  to: string;
  right?: boolean;
}

export const NavItem : React.SFC<NavItemProps> = ({to, children, right=false, ...rest}: NavItemProps) => {
  return (
    <NavItemBox to={to} right={right} {...rest}>
      {children}
    </NavItemBox>
  );
};