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

// color scheme : https://coolors.co/ffc093-ede580-a4af69-a5d37a-8aa399

const sharedTheme = {
  headerHeight: '100%',
  titleSize: '30px',
}

const colors = {
  warning: '#ffc093',
  primary: '#ede580',
  secondary: '#a4af69',
  tertiary: '#8aa399',
  success: '#a5d37a',
}
export const lightTheme = {
  fontColor: 'black',
  fontSize: '15px',
  name: 'light',
  ...sharedTheme
};

export const darkTheme = {
  fontColor: 'white',
  fontSize: '15px',
  name: 'dark',
  ...sharedTheme
};

injectGlobal`
  *{
    transition: all .15s linear;
    transition-property: box-shadow, border-color, height, width, background-color, font-size, color;
  }
`;

export { css, keyframes, ThemeProvider };