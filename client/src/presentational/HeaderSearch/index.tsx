import * as React from "react";
import { SearchActions } from "../../store/search";
import { HeaderSearchInput } from "./HeaderSearchStyles";
import { InputProps } from "src/lib";

interface IHeaderSearchProps extends InputProps {
  text?: string;
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
