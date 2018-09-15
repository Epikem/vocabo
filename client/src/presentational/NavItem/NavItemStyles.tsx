import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { theme } from '../../theme';

export const NavItemBox = styled(NavLink)`
  padding-left: 15px;
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
