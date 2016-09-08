/**
*
* BottomNav
*
*/

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const topTenIcon = <FontIcon className="material-icons">hearing</FontIcon>;
const viewAllIcon = <FontIcon className="material-icons">dashboard</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const searchIcon = <FontIcon className="material-icons">search</FontIcon>;

import styles from './styles.css';

class BottomNav extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    }
  }

  handleSelect(index) {
    this.setState({selectedIndex: index});
    switch (index) {
      case 0:
        this.props.dispatch(push('/'));
        return;

      case 1:
        this.props.dispatch(push('/top100'));
        return;

      case 2:
        this.props.dispatch(push('/search'));
        return;
    }
  }

  render() {
    return (
      <div className={`${styles.bottomNav}`}>
        <Paper zDepth={1} style={{zIndex: '99'}}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Top Ten"
              icon={topTenIcon}
              onTouchTap={this.handleSelect.bind(this, 0)}
            />
            <BottomNavigationItem
              label="Top 100"
              icon={viewAllIcon}
              onTouchTap={this.handleSelect.bind(this, 1)}
            />
            <BottomNavigationItem
              label="Search"
              icon={searchIcon}
              onTouchTap={this.handleSelect.bind(this, 2)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );

  }
}

function mapStateToProps(state){
  return {
    topTen: state.get('topTen'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);
