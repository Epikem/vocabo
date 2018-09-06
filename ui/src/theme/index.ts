import * as styledComponents from "styled-components";

const {
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export interface IThemeInterface {
  fontColor: string,
  fontSize: string;
  name: string;
  primaryColor: string;
}

export const lightTheme = {
  fontColor: 'black',
  fontSize: '15px',
  name: 'light',
  primaryColor: "#e9e9eb",
};

export const darkTheme = {
  fontColor: 'white',
  fontSize: '15px',
  name: 'dark',
  primaryColor: "gray",
};

export { css, injectGlobal, keyframes, ThemeProvider };