import * as React from 'react';
import { Header } from '../Header';

interface ILayoutProps {
  children:any;
}

export const Layout: React.SFC<ILayoutProps> = (props) => {
  return (
    <div>
      <Header/>
      {props.children}
    </div>
  );
};