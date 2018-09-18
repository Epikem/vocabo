import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeSelection, WordSearch } from './containers';
import { Layout } from './presentational';
import styled, { ThemeProvider, createGlobalStyle, theme } from './theme';

const Global = styled.createGlobalStyle`
  *{
    transition: all .15s linear;
    transition-property: box-shadow, border-color, height, width, background-color, font-size, color;
  }
  
  a {
    text-decoration: inherit;
    color: inherit;
  }

  body{
    background-color: ${theme('primaryColor', 'activeEffect')};
  }
`;


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
            <Global/>
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
