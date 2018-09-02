import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { WordSearch, ThemeSelection } from './containers';
import { Button } from './presentational';
import { darkTheme, lightTheme, ThemeProvider } from './theme';

class App extends React.Component<{}> {
  public state = {
    theme: lightTheme,
  }

  private methods = {
    changeTheme: (targetTheme:any) => {
      return () => {
        let theme = {};
        if(targetTheme === 'dark') {
          theme = darkTheme;
        }
        else { theme = lightTheme; }
        this.setState({theme});
      }
    }
  }

  public render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact={true} path={'/'} component={WordSearch}/>
              <Route path={'/theme'} component={ThemeSelection}/>
            </Switch>
            <ThemeProvider theme={darkTheme}>
              <Button onClick={this.methods.changeTheme('dark')}>dark theme</Button>
            </ThemeProvider>
            <ThemeProvider theme={lightTheme}>
              <Button onClick={this.methods.changeTheme('light')}>light theme</Button>
            </ThemeProvider>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
  }


}


export default App;
