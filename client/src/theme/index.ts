import * as _ from 'lodash';
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

type themeName = 
  | "light"
  | "dark";

interface IStaticTheme {
  headerHeight: string;
  titleSize: string;
  boxShadow: string;
  navFontColor: string;
  fontSize: string;
  themeName: themeName;

  sharedEffect1: Effect;
  activeEffect: Effect;
  hoverEffect: Effect;
  invertEffect: Effect;

  primaryColor?: string;
  fontColor?: string;
}

export interface ITheme extends Required<IStaticTheme> {}

// color scheme : https://coolors.co/ffc093-ede580-a4af69-a5d37a-8aa399

const sharedTheme = {
  headerHeight: "100%",
  titleSize: "30px",
  boxShadow: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)}`,
  sharedEffect1:(str:string)=>'test'
};

const colors = {
  warning: "#ffc093",
  primary: "#ede580",
  secondary: "#a4af69",
  tertiary: "#8aa399",
  success: "#a5d37a"
};

const getTheme = _.memoize(calculateTheme);

/**
 * returns calculated theme
 * @param name the theme name. 
 */
function calculateTheme(name: themeName) : ITheme{

  // calculated theme
  let ctheme : ITheme;
  const primaryColor = name === 'light' ? colors.primary : darken("0.1", invert(colors.primary));

  if(name === 'light'){
    ctheme = {
      ...lightTheme,
      primaryColor,
    }

  }else {
    ctheme = {
      ...darkTheme,
      primaryColor,
    }
  }

  return {
    ...ctheme,
    fontColor: getLuminance(ctheme.primaryColor) > 0.5 ? 'black' : 'white',
  };
}

export const lightTheme: IStaticTheme = {
  navFontColor: transparentize(0.2, darken("0.2", colors.secondary)),
  fontSize: "15px",
  themeName: "light",
  activeEffect: (color: string) => lighten(0.2, color),
  hoverEffect: (color: string) => {
    return darken(0.2, color);
  },
  invertEffect: (color: string) => {
    return invert(color);
  },
  ...sharedTheme,
};

export const darkTheme: IStaticTheme = {
  navFontColor: transparentize(0.2, lighten("0.2", invert(colors.secondary))),
  fontSize: "15px",
  themeName: "dark",
  activeEffect: (color: string) => {
    return darken(0.3, color);
  },
  hoverEffect: (color: string) => {
    return lighten(0.3, color);
  },
  invertEffect: (color: string) => {
    return invert(color);
  },
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

export { css, keyframes, ThemeProvider, createGlobalStyle, getTheme };
