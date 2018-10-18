import * as React from 'react';
import { Header } from '../Header';

interface ILayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const Layout: React.SFC<ILayoutProps> = (props) => {
  return (
    <>
      {props.header}
      {props.children}
    </>
  );
};