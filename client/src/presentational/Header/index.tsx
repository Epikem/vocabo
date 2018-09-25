import * as React from "react";
import { FlexBox } from "../FlexBox";
import { NavItem } from "../NavItem";
import { HeaderBox, LogoBox } from "./HeaderStyles";

interface IHeaderProps {}

export const Header: React.SFC<IHeaderProps> = props => {
  return (
    <HeaderBox>
      <FlexBox direction="row">
        <LogoBox><NavItem to="/">Memorybook</NavItem></LogoBox>
        <NavItem to="theme">theme</NavItem>
      </FlexBox>
    </HeaderBox>
  );
};
