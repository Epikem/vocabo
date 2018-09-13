import * as React from "react";
import { HeaderBox, LogoBox, HeaderItem } from "./HeaderStyles";
import { FlexBox } from "../FlexBox";
import { NavItem } from "../NavItem";

interface IHeaderProps {}

export const Header: React.SFC<IHeaderProps> = props => {
  return (
    <HeaderBox>
      <FlexBox direction="row">
        <HeaderItem>
          <LogoBox><NavItem to="/">Memorybook</NavItem></LogoBox>
        </HeaderItem>
        <HeaderItem>
          <NavItem to="theme">theme</NavItem>
        </HeaderItem>
      </FlexBox>
    </HeaderBox>
  );
};
