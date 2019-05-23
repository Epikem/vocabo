import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Card } from "src/presentational";
import { Button, WordList } from "../presentational";
import { RootState } from "../store";
import { SearchActions, SearchState } from '../store/search';

type OwnProps = {};

type StateProps = {
  result: SearchState['result'];
  searchText: SearchState['searchText'];
};

type DispatchProps = {
  changeSearchText: SearchActions['changeSearchText'];
  requestSearch: SearchActions['requestSearch'];
}

type Props = StateProps & DispatchProps & OwnProps;

type State = { };

class WordSearch extends React.Component<Props, State> {
  public state = {};

  public constructor(props: Props) {
    super(props);
    return this;
  }

  public render() {
    return (
      <Card style={{margin:'25px', padding:'25px', backgroundColor:'transparent'}}>
        <div style={{textAlign: 'center', fontSize:'3rem', marginBottom:'30px'}}>
          WordSearch
        </div>
        <ul>
          <WordList words={this.props.result}></WordList>
        </ul>
      </Card>
    );
  }

  private handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.changeSearchText({searchText: e.currentTarget.value});
    this.props.requestSearch({searchText: e.currentTarget.value});
  }
}

export default connect(
  (state: RootState) => ({
    result: state.search.result,
    searchText: state.search.searchText,
  }),
  (dispatch) => bindActionCreators({
    changeSearchText: SearchActions.changeSearchText,
    requestSearch: SearchActions.requestSearch,
  }, dispatch)
)(WordSearch);