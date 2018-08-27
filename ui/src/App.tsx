import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { WordSearch } from './containers';

class App extends React.Component<{}> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={'/'} component={WordSearch}/>
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
