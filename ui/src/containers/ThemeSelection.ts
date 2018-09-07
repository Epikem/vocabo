import * as React from "react";
import { connect } from "react-redux"; 
import { bindActionCreators, Dispatch } from "redux";
import { ThemeSelect } from "../presentational";
import { changeTheme } from "../store/themes";

const mapStateToProps = (state: any) => ({
  currentTheme: state.theme.currentTheme
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  changeTheme,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelect);