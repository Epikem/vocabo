import * as styledComponents from "styled-components";
import { invert, darken, lighten, transparentize } from "polished";

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  createGlobalStyle,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
ITheme
>;

type Effect = (color: string) => string;

type themeEffects = Record<themeEffectKey, Effect>;

type themeAttributes = Record<themeAttributeKey, string>;

interface IThemeEffects {
  sharedEffect1: Effect;
  activeEffect: Effect;
  hoverEffect: Effect;
  invertEffect: Effect;
}

interface IThemeAttributes {
  headerHeight: string;
  titleSize: string;
  boxShadow: string;
  navFontColor: string;
  fontSize: string;
  themeName: themeName;
  primaryColor: string;
  fontColor: string;
}

export interface ITheme extends IThemeEffects, IThemeAttributes {}

// color scheme : https://coolors.co/ffc093-ede580-a4af69-a5d37a-8aa399

const sharedTheme = {
  headerHeight: "100%",
  titleSize: "30px",
  boxShadow: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)}`
};

const colors = {
  warning: "#ffc093",
  primary: "#ede580",
  secondary: "#a4af69",
  tertiary: "#8aa399",
  success: "#a5d37a"
};

const lightEffects: themeEffects = {
  activeEffect: (color: string) => lighten(0.2, color),
  hoverEffect: (color: string) => {
    return darken(0.2, color);
  },
  invertEffect: (color: string) => {
    return invert(color);
  }
};

const darkEffects: themeEffects = {
  activeEffect: (color: string) => {
    return darken(0.3, color);
  },
  hoverEffect: (color: string) => {
    return lighten(0.3, color);
  },
  invertEffect: (color: string) => {
    return invert(color);
  }
};

export const lightTheme: ITheme = {
  navFontColor: transparentize(0.2, darken("0.2", colors.secondary)),
  fontColor: 'black',
  fontSize: "15px",
  themeName: "light",
  primaryColor: 'colors.warning',
  ...lightThemeEffects,
  ...sharedTheme,
};

export const darkTheme: ITheme = {
  navFontColor: transparentize(0.2, lighten("0.2", invert(colors.secondary))),
  fontColor: 'white',
  fontSize: "15px",
  themeName: "dark",
  primaryColor: 'darken("0.1", invert(colors.primary))',
  ...darkThemeEffects,
  ...sharedTheme,
};

export const theme = (
  name: themeAttributeKey,
  ...effects: themeEffectKey[]
) => {
  return (props: any) => {
    let ret = props.theme[name];
    if (effects) {
      for (const effect of effects) {
        ret = props.theme[effect](ret);
      }
    }
    return ret;
  };
};

styled.createGlobalStyle = createGlobalStyle;

export default styled;

export { css, keyframes, ThemeProvider, createGlobalStyle };
