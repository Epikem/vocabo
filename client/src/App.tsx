import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeSelection, WordSearch } from './containers';
import { Layout } from './presentational';
import { ThemeProvider } from './theme';

class App extends React.Component<any> {

  public render() {
    const { currentTheme } = this.props;
    return (
      <ThemeProvider theme={currentTheme}>
        <BrowserRouter>
          <Layout>
            <div>
              <Switch>
                <Route exact={true} path={'/'} component={WordSearch}/>
                <Route path={'/theme'} component={ThemeSelection}/>
              </Switch>
            </div>
          </Layout>
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
