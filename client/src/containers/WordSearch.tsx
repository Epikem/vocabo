import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Button, WordList } from "../presentational";
import { RootState } from "../store";
import { SearchActions, SearchState } from '../store/search';
import { Card } from "src/presentational";

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
      <Card style={{margin:'25px', backgroundColor: 'black'}}>
        WordSearch
        <ul>
          <WordList words={this.props.result}></WordList>
        </ul>
        <Button>test button</Button>
        <input onChange={this.handleChangeSearchText} value={this.props.searchText} />
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