import * as React from "react";
import { SearchActions } from "../../store/search";
import { HeaderSearchInput } from "./HeaderSearchStyles";

interface IHeaderSearchProps {
  text?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const HeaderSearch: React.SFC<IHeaderSearchProps> = props => {
  return (
    <HeaderSearchInput
      onChange={props.onChange}
      value={props.text}
      placeholder={"search words..."}
    />
  );
};
