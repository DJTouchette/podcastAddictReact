/*
 *
 * TopHundred
 *
 */

 import React from 'react';
 import { connect } from 'react-redux';
 import selectTopTen from './selectors';
 import styles from './styles.css';
 import { requestTop100 } from './actions';
 import PodStream from 'containers/PodStream';
 import Loading from 'components/Loading';

export class TopHundred extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.top100.list) {
      this.props.requestTop100();
    }

  }

  render() {
    const { top100 } = this.props;
    if (!top100.list || top100.isFetching) {
      return (
        <Loading />
      );
    }

    return (
      <div className={`${styles.top100}`}>
        <h1 className={`center flow-text ${styles.title}`}>Top 100 Podcasts</h1>
        <PodStream
          list={top100.list}
         />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    top100: state.get('topHundred'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    requestTop100: () => dispatch(requestTop100()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHundred);
