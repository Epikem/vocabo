import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Button, Header, HeaderProps } from "../presentational";
import { RootState } from "../store";
import { SearchActions, SearchState } from '../store/search';
import { MenuActions, IMenuState } from '../store/menu';

type OwnProps = {};

type StateProps = {
  result: SearchState['result'];
  searchText: SearchState['searchText'];
  menuVisible: IMenuState['opened'];
};

type DispatchProps = {
  changeSearchText: SearchActions['changeSearchText'];
  requestSearch: SearchActions['requestSearch'];
  toggleMenuPanel: MenuActions['toggleMenu'];
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
    const { handleChangeSearchText, handleMenuButtonClick } = this;
    const { searchText, menuVisible } = this.props;
    return (
      <Header 
        onSearchTextChange={handleChangeSearchText} 
        onMenuButtonClick={handleMenuButtonClick}
        searchText={searchText}
        menuVisible={menuVisible}
      />
    );
  }

  private handleChangeSearchText : React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.props.changeSearchText({searchText: e.currentTarget.value});
    this.props.requestSearch({searchText: e.currentTarget.value});
  }

  private handleMenuButtonClick: HeaderProps['onMenuButtonClick'] = (e) => {
    this.props.toggleMenuPanel();
  }
}

export default connect(
  (state: RootState) => ({
    result: state.search.result,
    searchText: state.search.searchText,
    menuVisible: state.menu.opened,
  }),
  (dispatch) => bindActionCreators({
    changeSearchText: SearchActions.changeSearchText,
    requestSearch: SearchActions.requestSearch,
    toggleMenuPanel: MenuActions.toggleMenu,
  }, dispatch)
)(HeaderSearchContainer);