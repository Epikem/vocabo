import * as styledComponents from "styled-components";

const {
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export interface IThemeInterface {
  primaryColor: string;
  fontColor: string,
  fontSize: string;
}

export const lightTheme = {
  fontColor: 'black',
  fontSize: '15px',
  primaryColor: "#e9e9eb",
};

export const darkTheme = {
  fontColor: 'white',
  fontSize: '15px',
  primaryColor: "gray",
};

export { css, injectGlobal, keyframes, ThemeProvider };