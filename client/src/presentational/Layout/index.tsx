import * as React from 'react';
import { Header } from '../Header';

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout: React.SFC<ILayoutProps> = (props) => {
  return (
    <>
      <Header/>
      {props.children}
    </>
  );
};