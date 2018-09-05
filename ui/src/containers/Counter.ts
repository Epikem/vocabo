import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Counter } from "../presentational";
import { increment } from './../store/counters';

const mapStateToProps = (state: any) => ({
  count: state.counter.reduxCounter,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  increment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);