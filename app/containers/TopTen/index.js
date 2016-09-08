/*
 *
 * TopTen
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectTopTen from './selectors';
import styles from './styles.css';
import { requestTopTen } from './actions';
import PodStream from 'containers/PodStream';
import Loading from 'components/Loading';

export class TopTen extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    if (!this.props.topTen.list) {
      this.props.requestTopTen();
    }

  }

  render() {
    const { topTen } = this.props;
    if (!topTen.list || topTen.isFetching) {
      return (
        <Loading />
      );
    }

    return (
      <div className={`${styles.topTen}`}>
        <h1 className={`center flow-text ${styles.title}`}>Top 10 Podcasts</h1>
        <div className={styles.under}>
        <PodStream
          list={topTen.list}
         />
         </div>
      </div>
    );
  }
}

// const mapStateToProps = selectTopTen();

function mapStateToProps(state){
  return {
    topTen: state.get('topTen'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    requestTopTen: () => dispatch(requestTopTen()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTen);
