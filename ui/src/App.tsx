import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { ThemeSelection, WordSearch } from './containers';
import Counter from './containers/Counter';
import { Button } from './presentational';
import { ThemeProvider } from './theme';

class App extends React.Component<any> {

  public render() {
    const { currentTheme } = this.props;
    return (
      <ThemeProvider theme={currentTheme}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact={true} path={'/'} component={WordSearch}/>
              <Route path={'/theme'} component={ThemeSelection}/>
            </Switch>
            <Link to={'/'}>to home</Link>
            <Link to={'/theme'}>to theme</Link>
            <div>theme : {currentTheme.name}</div>
            <Counter label='dsd' />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
  }


}

// const mapStateToProps = (state: any) => ({
//   currentTheme: state.theme.currentTheme
// })

const mapStateToProps = (state: any) => ({
  currentTheme: state.theme.currentTheme
});

export default connect(mapStateToProps)(App);
