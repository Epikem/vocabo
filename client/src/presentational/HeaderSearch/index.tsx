import * as React from "react";
import { HeaderSearchInput } from "./HeaderSearchStyles";

interface IHeaderSearchProps { }

export const HeaderSearch: React.SFC<IHeaderSearchProps> = props => {
  return (
    <HeaderSearchInput placeholder={'search words...'} />
  );
};