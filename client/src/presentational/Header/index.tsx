import * as React from "react";
import { FlexBox } from "../FlexBox";
import { HeaderSearch } from "../HeaderSearch";
import { NavItem } from "../NavItem";
import { HeaderBox, LogoBox } from "./HeaderStyles";

export interface Props {
  searchText?: string;
  onSearchTextChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Header : React.SFC<Props> = (props) =>{ 
  const { onSearchTextChange } = props;
  return (
    <HeaderBox>
      <FlexBox direction="row">
        <LogoBox><NavItem to="/">Memorybook</NavItem></LogoBox>
        <NavItem to="theme">theme</NavItem>
        <HeaderSearch onChange={onSearchTextChange} text={props.searchText}></HeaderSearch>
        <div>user menu</div>
      </FlexBox>
    </HeaderBox>
  )

}