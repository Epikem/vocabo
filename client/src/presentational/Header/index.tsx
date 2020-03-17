import * as React from "react";
import { InputChangeEvent } from "src/lib";
import { FlexBox } from "../FlexBox";
import { HeaderSearch } from "../HeaderSearch";
import { HeaderBox, LogoBox } from "./HeaderStyles";
import { MenuPanel } from '../MenuPanel';
import { Button, NavItem } from "..";
import { OutsideClick } from '../OutsideClick';
 
export interface HeaderProps {
  searchText?: string;
  onSearchTextChange: InputChangeEvent;
  onMenuButtonClick: React.MouseEventHandler;
  onMenuOutsideClick: React.MouseEventHandler;
  menuVisible: boolean;
}

export const Header : React.SFC<HeaderProps> = (props) =>{ 
  const { 
    onSearchTextChange, 
    onMenuButtonClick, 
    onMenuOutsideClick, 
    menuVisible } = props;
  return (
    <HeaderBox>
      <FlexBox direction="row">
        <LogoBox><NavItem to="/">vocabo</NavItem></LogoBox>
        <NavItem to="theme">theme</NavItem>
        <HeaderSearch onChange={onSearchTextChange} text={props.searchText} />
        <Button onClick={onMenuButtonClick}>user menu</Button>
        <OutsideClick onClick={onMenuOutsideClick}>
          <MenuPanel visible={menuVisible}>
            <div>menu panel</div>
            <Button onClick={onMenuButtonClick}>close</Button>
          </MenuPanel>
        </OutsideClick>
      </FlexBox>
    </HeaderBox>
  )
}