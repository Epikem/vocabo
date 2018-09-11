import * as styledComponents from "styled-components";
import { invert, darken, lighten } from "polished";

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
  fontColor: darken('0.3', colors.secondary),
  fontSize: '15px',
  name: 'light',
  primaryColor: colors.primary,
  ...sharedTheme
};

export const darkTheme = {
  fontColor: lighten('0.3', invert(colors.secondary)),
  fontSize: '15px',
  name: 'dark',
  primaryColor: darken('0.1',invert(colors.primary)),
  ...sharedTheme
};

injectGlobal`
  *{
    transition: all .15s linear;
    transition-property: box-shadow, border-color, height, width, background-color, font-size, color;
  }
  
  a {
    text-decoration: inherit;
    color: inherit;
  }
`;

export { css, keyframes, ThemeProvider };