/*
 *
 * Search
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectSearch from './selectors';
import styles from './styles.css';
import { requestSearch, searchForm } from './actions';
import SearchForm from 'components/SearchForm';
import SearchStream from 'components/SearchStream';
import NoResults from 'components/NoResults';
import Loading from 'components/Loading';

const ENTER_CODE = 13;

export class Search extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    window.addEventListener('keydown', this.onEnter.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEnter.bind(this), false);
  }

  onEnter() {
    if (event.keyCode == ENTER_CODE) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    if (this.props.search.formValue === undefined) {
      this.props.requestSearch('a blank search');
      return;
    };
    this.props.requestSearch(this.props.search.formValue);
  }

  render() {
    const { searchList } = this.props.search;
    return (
      <div className={styles.search}>
      <h1 className={`center flow-text ${styles.title}`}>Search For A Podcast</h1>
      <div className='center'>
        <SearchForm
          handleForm={this.props.searchForm.bind(this)}
          handleClick={this.handleSubmit.bind(this)}
          formValue={this.props.search.formValue}
        />
      </div>
      { this.props.search.isFetching?
          <Loading /> : searchList?
          searchList.length === 0?
          <NoResults searchTerm={this.props.search.term}/> :
          <SearchStream
            list={searchList}
          /> : null
      }

      </div>
    );
  }
}

// const mapStateToProps = selectSearch();

function mapStateToProps(state){
  return {
    search: state.get('search'),
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    requestSearch: (value) => dispatch(requestSearch(value)),
    searchForm: (value) => dispatch(searchForm(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
