import { transparentize } from "polished";
import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeSelection, WordSearch } from "./containers";
import { Layout } from "./presentational";
import { createGlobalStyle, css, ThemeProvider } from "./theme";

const Global = createGlobalStyle`
  ${({ theme: { fontColor, primaryColor, highlightEffect, fontSize } }) => css`
    div {
      background-color: inherit;
    }

    div, input, p, a, button, body {
      color: ${fontColor};
      font-size: ${fontSize};
      transition: all .15s linear;
      transition-property: box-shadow, border-color, height, width,
        background-color, font-size, color;
    }

    p {
      color: ${fontColor};
    }

    a {
      text-decoration: inherit;
      color: inherit;
    }

    body {
      color: ${fontColor};
      background-color: ${highlightEffect(-0.1, primaryColor)};
    }
  `};
`;

class App extends React.Component<any> {
  public render() {
    const { currentTheme } = this.props;
    return (
      <ThemeProvider theme={currentTheme}>
        <BrowserRouter>
          <Layout>
            <>
              <Switch>
                <Route exact={true} path={"/"} component={WordSearch} />
                <Route path={"/theme"} component={ThemeSelection} />
              </Switch>
            </>
            <Global />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentTheme: state.theme.currentTheme
});

export default connect(mapStateToProps)(App);
