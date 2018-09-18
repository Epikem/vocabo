import { NavLink } from 'react-router-dom';
import styled, { theme } from '../../theme';

export const NavItemBox = styled(NavLink)`
  padding-left: 10px;
  padding-right: 10px;
  user-select: none;
  cursor: pointer;
  font-size: inherit;

  :hover{
    color: ${theme('fontColor', 'hoverEffect')};
  }

  :active{
    color:${theme('fontColor', 'activeEffect')}
  }
`;
