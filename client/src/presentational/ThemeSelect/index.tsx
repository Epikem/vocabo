import * as React from "react";
import { darkTheme, lightTheme, ThemeProvider } from "../../theme";
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
      <Button>button</Button>
      <ThemeProvider theme={darkTheme}>
        <Button onClick={changeThemeDark}>dark theme</Button>
      </ThemeProvider>
      <ThemeProvider theme={lightTheme}>
        <Button onClick={changeThemeLight}>light theme</Button>
      </ThemeProvider>
    </div>
  )
};

export { ThemeSelect };
