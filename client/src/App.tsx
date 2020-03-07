import { transparentize } from "polished";
import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HeaderSearchContainer, ThemeSelection, WordSearch } from "./containers";
import { Layout } from "./presentational";
import { createGlobalStyle, css, ThemeProvider } from "./theme";
import Amplify, { API } from 'aws-amplify';
import awsConfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsConfig);

let apiName = 'todoAPI'
let path = '/items'

const Global = createGlobalStyle`
  ${({ theme: { fontColor, primaryColor, highlightEffect, fontSize } }) => css`
    ${css`
      /* http://meyerweb.com/eric/tools/css/reset/
        v4.0 | 20180602
        License: none (public domain)
      */
      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed,
      figure, figcaption, footer, header, hgroup,
      main, menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        :focus{
          /* box-shadow: 0 0 1px 1px ${highlightEffect(0.2, fontColor)}; */
        }
        margin: 0;
        padding: 0;
        border: 0;
        font-size: ${fontSize};
        font: inherit;
        font-family: sans-serif;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure,
      footer, header, hgroup, main, menu, nav, section {
        display: block;
      }
      /* HTML5 hidden-attribute fix for newer browsers */
      *[hidden] {
          display: none;
      }
      body {
        line-height: 1;
      }
      ol, ul {
        list-style: none;
      }
      blockquote, q {
        quotes: none;
      }
      blockquote:before, blockquote:after,
      q:before, q:after {
        content: '';
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
    `}

    div, input, p, a, button, body {
      color: ${fontColor};
      font-size: ${fontSize};
      transition: all .15s linear;
      transition-property: box-shadow, border-color, height, width,
        background-color, font-size, color;
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
          <Layout header={<HeaderSearchContainer/>}>
            <>
              <a href="https://info.flagcounter.com/qhmw" style={{display: 'none'}}>
                <img src="https://s11.flagcounter.com/count/qhmw/bg_000000/txt_FFFFFF/border_CCCCCC/columns_1/maxflags_5/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter"/>
              </a>
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

export default connect(mapStateToProps)(withAuthenticator(App,false ));
