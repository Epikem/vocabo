import * as _ from 'lodash';
import { darken, getLuminance, invert as invertColor, lighten, setLightness, transparentize } from "polished";
import * as styledComponents from "styled-components";

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  createGlobalStyle,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
Theme
>;


type Effect = (...args:Array<any>) => string;

type ThemeName = 
  | "light"
  | "dark";

interface StaticTheme {
  headerHeight: string;
  titleSize: string;
  boxShadow: string;
  fontSize: string;
  navPadding: string;
  themeName: ThemeName;
  borderRadius: string;
  
  sharedEffect1: Effect;
  activeEffect: Effect;
  hoverEffect: Effect;
  invertEffect: Effect;
  
  borderColor?: string;
  primaryColor?: string;
  fontColor?: string;
  navFontColor?: string;
  highlightEffect?: Effect;
}

export interface Theme extends Required<StaticTheme> {}

// color scheme : https://coolors.co/ffc093-ede580-a4af69-a5d37a-8aa399

const sharedTheme = {
  boxShadow: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)}`,
  headerHeight: "100%",
  sharedEffect1:(str:string)=>'test',
  titleSize: "30px",
  navPadding: '.5rem',
  borderRadius: '3px',
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
function calculateTheme(name: ThemeName) : Theme{

  // calculated theme
  let ctheme : Theme;
  const primaryColor = name === 'light' ? lighten(0.1, colors.primary) : setLightness(0.08, colors.primary);
  const secondaryColor = name === 'light' ? lighten(0.1, colors.secondary) : setLightness(0.05, colors.secondary);
  const isBrightTheme = getLuminance(primaryColor) > 0.5;
  const fontColor = isBrightTheme ? 'black' : 'white';
  const highlightEffect = isBrightTheme ? (amount: number, color: string) => {
    return darken(amount, color);
  } : (amount: number, color: string) => {
    return lighten(amount, color);
  };
  const borderColor = transparentize(0.4, highlightEffect(0.4, secondaryColor));
  const navFontColor = highlightEffect(0.4, secondaryColor);

  const dynamic = {
    fontColor,
    primaryColor,
    highlightEffect,
    borderColor,
    navFontColor,
  }

  if(name === 'light'){
    ctheme = {
      ...lightTheme,
      ...dynamic,
    }
  } else {
    ctheme = {
      ...darkTheme,
      ...dynamic,
    }
  }

  return ctheme;
}

// example css function 1
export function truncate(width: string | number) {
  return css`
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}

export function invertBox(theme: Theme){
  return css`
    ${invertColor
    ? css`
        border: 0;
        color: ${theme.fontColor};
        background-color: transparent;
      `
    : css``};
    `;
}

// example css function 2
export const media = {
  handheld: (args:TemplateStringsArray) => css`
    @media (max-width: 420px) {
      ${ css(args) }
    }
  `
}

// // Usage example
// const Box = styled.div`
//   ${ truncate('250px') }
//   background: papayawhip;
// `;

export const lightTheme: StaticTheme = {
  fontSize: "15px",
  themeName: "light",
  activeEffect: (color: string) => lighten(0.1, color),
  hoverEffect: (color: string) => {
    return darken(0.2, color);
  },
  invertEffect: (color: string) => {
    return invertColor(color);
  },
  ...sharedTheme,
};

export const darkTheme: StaticTheme = {
  fontSize: "15px",
  themeName: "dark",
  activeEffect: (color: string) => {
    return darken(0.1, color);
  },
  hoverEffect: (color: string) => {
    return lighten(0.2, color);
  },
  invertEffect: (color: string) => {
    return invertColor(color);
  },
  ...sharedTheme,
};

export default styled;

export { css, keyframes, ThemeProvider, createGlobalStyle, getTheme };
