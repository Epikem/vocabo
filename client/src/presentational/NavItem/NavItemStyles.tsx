import { NavLink } from 'react-router-dom';
import styled, { theme } from '../../theme';

export const NavItemBox = styled(NavLink)`
  padding: .5rem;
  user-select: none;
  cursor: pointer;

  color: ${theme('navFontColor')};
  font-size: ${theme('titleSize')};
  border-bottom: 2px solid transparent;
  display: flex;

  :hover{
    border-bottom: 2px solid ${theme('navFontColor')};
  }

  :hover{
    color: ${theme('fontColor', 'hoverEffect')};
  }

  :active{
    color:${theme('fontColor', 'activeEffect')}
  }
`;
