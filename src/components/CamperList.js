import React, { Component } from 'react';
import axios from 'axios';

import CamperListItem from './CamperListItem';

class CamperList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      recentCampers: [],
      allTimeCampers: []
    };
  }

  fetchRecentCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }

  fetchAlltimeCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  componentWillMount() {
    axios.all([this.fetchRecentCampers(), this.fetchAlltimeCampers()])
      .then(axios.spread((recent, allTime) => {
        this.setState({
          loaded: true,
          recentCampers: recent.data,
          allTimeCampers: allTime.data
        });
      }));
  }

  renderTable() {
    return this.state.recentCampers.map((camper, index) => {
      return <CamperListItem key={camper.username} {...camper} />
    });
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return <div>Loading...</div>
    }

    return (
      <div className="col-md-12">
        <h1>Camper Leaderboard</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Recent Points</th>
              <th>All Time Points</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CamperList;
