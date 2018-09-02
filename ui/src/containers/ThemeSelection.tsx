import * as React from "react";
import { Button } from "../presentational";
import { darkTheme, lightTheme, ThemeProvider } from '../theme';

class ThemeSelection extends React.Component<any, any> {
  public state = {
    theme: '',
  };

  public methods: any = {
    changeTheme: (themeName: string) => {
      
    }
  }

  public render() {
    return (
      <div>
        ThemeSelection
        <Button>test button</Button>
          <ThemeProvider theme={darkTheme}>
            <Button onClick={this.methods.changeTheme('dark')}>dark theme</Button>
          </ThemeProvider>
          <ThemeProvider theme={lightTheme}>
            <Button onClick={this.methods.changeTheme('light')}>light theme</Button>
          </ThemeProvider>
      </div>
    );
  }
}

export default ThemeSelection;
