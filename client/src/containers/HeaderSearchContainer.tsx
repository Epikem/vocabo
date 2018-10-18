import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Button, Header, Word } from "../presentational";
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

class HeaderSearchContainer extends React.Component<Props, State> {
  public state = {};

  public constructor(props: Props) {
    super(props);
    return this;
  }

  public render() {
    const { handleChangeSearchText } = this;
    const { searchText } = this.props;
    return (
      <Header 
        onSearchTextChange={handleChangeSearchText} 
        searchText={searchText}
      />
    );
  }

  private handleChangeSearchText : React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
)(HeaderSearchContainer);