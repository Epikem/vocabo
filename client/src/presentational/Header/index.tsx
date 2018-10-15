import * as React from "react";
import { FlexBox } from "../FlexBox";
import { HeaderSearch } from "../HeaderSearch";
import { NavItem } from "../NavItem";
import { HeaderBox, LogoBox } from "./HeaderStyles";

export interface Props {

}

export const Header : React.SFC<Props> = (props) => (
  <HeaderBox>
    <FlexBox direction="row">
      <LogoBox><NavItem to="/">Memorybook</NavItem></LogoBox>
      <NavItem to="theme">theme</NavItem>
      <div style={{width: '20%'}}></div>
      <HeaderSearch></HeaderSearch>
      <div style={{width: '40%', marginLeft:'auto'}}></div>
    </FlexBox>
  </HeaderBox>
)