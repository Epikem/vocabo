import * as React from 'react';
import { HeaderBox, LogoBox } from './HeaderStyles';

interface IHeaderProps {

}

export const Header: React.SFC<IHeaderProps> = (props) => {
  return (
    <HeaderBox>
      <LogoBox>Memorybook</LogoBox>
      
    </HeaderBox>
  );
};