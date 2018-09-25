import { getLuminance } from "polished";
import * as React from "react";
import { darkTheme, getTheme, lightTheme, ThemeProvider, } from "../../theme";
import { Button } from "../Button";

const ThemeSelect = (props: any) => {
  const { currentTheme, changeTheme } = props;
  const changeThemeDark = () => {
    changeTheme('dark');
  }
  const changeThemeLight = () => {
    changeTheme('light');
  }
  return (
    <div>
      <div>theme: {currentTheme.name}</div>
      <ThemeProvider theme={getTheme('dark')}>
        <Button onClick={changeThemeDark}>dark theme</Button>
      </ThemeProvider>
      <ThemeProvider theme={getTheme('light')}>
        <Button onClick={changeThemeLight}>light theme</Button>
      </ThemeProvider>
      <div>
        luminance: {getLuminance(currentTheme.primaryColor)}
      </div>
    </div>
  )
};

export { ThemeSelect };
