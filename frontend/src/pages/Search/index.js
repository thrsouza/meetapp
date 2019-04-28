import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MeetupCardList from '../../components/MeetupCardList';

import SubscriptionsActions from '../../store/ducks/subscriptions';
import UpcomingActions from '../../store/ducks/upcoming';
import RecommendedActions from '../../store/ducks/recommended';

import {
  Container, Content, Header, SearchBox, InputSearch,
} from './styles';

class Search extends Component {
  static propTypes = {
    subscriptions: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape().isRequired),
      }),
      error: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
    }).isRequired,
    upcoming: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape().isRequired),
      }),
      error: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
    }).isRequired,
    recommended: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape().isRequired),
      }),
      error: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
    }).isRequired,
    getSubscriptionsRequest: PropTypes.func.isRequired,
    getUpcomingRequest: PropTypes.func.isRequired,
    getRecommendedRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getSubscriptionsRequest, getUpcomingRequest, getRecommendedRequest } = this.props;

    getSubscriptionsRequest();
    getUpcomingRequest();
    getRecommendedRequest();
  }

  handleSearchChange = async (event) => {
    const { getSubscriptionsRequest, getUpcomingRequest, getRecommendedRequest } = this.props;

    getSubscriptionsRequest(event.target.value);
    getUpcomingRequest(event.target.value);
    getRecommendedRequest(event.target.value);
  };

  render() {
    const { subscriptions, upcoming, recommended } = this.props;

    return (
      <Container>
        <Content>
          <Header>
            <SearchBox>
              <i className="fas fa-search" />
              <InputSearch
                placeholder="Buscar meetups"
                onChange={event => this.handleSearchChange(event)}
              />
            </SearchBox>
          </Header>
          <MeetupCardList title="Inscrições" data={subscriptions.data} />
          <MeetupCardList title="Próximos meetups" data={upcoming.data} />
          <MeetupCardList title="Recomendados" data={recommended.data} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  subscriptions: state.subscriptions,
  upcoming: state.upcoming,
  recommended: state.recommended,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...SubscriptionsActions,
    ...UpcomingActions,
    ...RecommendedActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
