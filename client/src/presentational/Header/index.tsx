import * as React from "react";
import { InputChangeEvent } from "src/lib";
import { FlexBox } from "../FlexBox";
import { HeaderSearch } from "../HeaderSearch";
import { NavItem } from "../NavItem";
import { HeaderBox, LogoBox } from "./HeaderStyles";
 
export interface HeaderProps {
  searchText?: string;
  onSearchTextChange: InputChangeEvent;
}

export const Header : React.SFC<HeaderProps> = (props) =>{ 
  const { onSearchTextChange } = props;
  return (
    <HeaderBox>
      <FlexBox direction="row">
        <LogoBox><NavItem to="/">vocabo</NavItem></LogoBox>
        <NavItem to="theme">theme</NavItem>
        <HeaderSearch onChange={onSearchTextChange} text={props.searchText} />
        <div>user menu</div>
      </FlexBox>
    </HeaderBox>
  )
}