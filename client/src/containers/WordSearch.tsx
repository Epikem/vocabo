import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Button } from "../presentational";
import { RootState } from "../store";
import { SearchActions, SearchState } from '../store/search';

type propTypes = typeof SearchActions & typeof SearchState;

class WordSearch extends React.Component<propTypes, any> {
  public state = {};

  public constructor(props: propTypes) {
    super(props);
    return this;
  }

  public render() {
    return (
      <div>
        WordSearch
        <ul>
          <li>Korean | English</li>
          {this.props.result.map(e=>{
            return <li key={e.id}>{e.Korean} : {e.English}</li>;
          })}
        </ul>
        <Button>test button</Button>
        <input onChange={this.handleChangeSearchText} value={this.props.searchText} />
      </div>
    );
  }

  private handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.changeSearchText({searchText: e.target.value});
  }
}

export default connect(
  (state: RootState) => ({
    result: state.search.result
  }),
  (dispatch: Dispatch) => bindActionCreators({
    changeSearchText: SearchActions.changeSearchText,
  }, dispatch)
)(WordSearch);