import * as React from "react";
import { InputChangeEvent } from "src/lib";
import { FlexBox } from "../FlexBox";
import { HeaderSearch } from "../HeaderSearch";
import { HeaderBox, LogoBox } from "./HeaderStyles";
import { Button, NavItem } from "..";
 
export interface HeaderProps {
  searchText?: string;
  onSearchTextChange: InputChangeEvent;
  onMenuButtonClick: React.MouseEventHandler;
  menuVisible: boolean;
}

export const Header : React.SFC<HeaderProps> = (props) =>{ 
  const { onSearchTextChange, onMenuButtonClick } = props;
  return (
    <HeaderBox>
      <FlexBox direction="row">
        <LogoBox><NavItem to="/">vocabo</NavItem></LogoBox>
        <NavItem to="theme">theme</NavItem>
        <HeaderSearch onChange={onSearchTextChange} text={props.searchText} />
        <Button onClick={onMenuButtonClick}>user menu</Button>
      </FlexBox>
    </HeaderBox>
  )
}