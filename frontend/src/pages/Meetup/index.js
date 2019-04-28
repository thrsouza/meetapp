import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import momentLocale from 'moment/locale/pt-br';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MeetupActions from '../../store/ducks/meetup';
import SubscriptionsActions from '../../store/ducks/subscriptions';

import Button from '../../components/Button';

import {
  Container, BannerContent, Content, Form,
} from './styles';

moment.locale('pt-br');

class Meetup extends Component {
  static propTypes = {
    meetup: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        where: PropTypes.string.isRequired,
        when: PropTypes.string.isRequired,
        file: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }),
      }),
      error: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    getMeetupRequest: PropTypes.func.isRequired,
    addSubscriptionsRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getMeetupRequest, location } = this.props;

    const query = new URLSearchParams(location.search);

    getMeetupRequest(query.get('id'));
  }

  handleSubscription = async (event) => {
    event.preventDefault();

    const { meetup, addSubscriptionsRequest } = this.props;

    if (!meetup.data.is_subscribed) {
      addSubscriptionsRequest(meetup.data.id);
    }
  };

  renderButton = (isSubscribed) => {
    if (isSubscribed) {
      return (
        <Button color="#2f2d38">
          {'Inscrito '}
          <i className="fas fa-check" />
        </Button>
      );
    }

    return <Button>Inscreva-se</Button>;
  };

  render() {
    const { meetup } = this.props;

    if (meetup.data) {
      return (
        <Container>
          <BannerContent>
            <img src={meetup.data.file.url} alt={meetup.data.title} />
          </BannerContent>
          <Content>
            <h2>{meetup.data.title}</h2>
            <small>{`${meetup.data.subscriptions_count} membros`}</small>
            <p>{meetup.data.description}</p>

            <small>Realizado em:</small>
            <p>{meetup.data.where}</p>

            <small>Quando?</small>
            <p>
              {moment(meetup.data.when)
                .utc()
                .locale('pt-br', momentLocale)
                .format('LLL')}
            </p>
            <Form onSubmit={this.handleSubscription}>
              {this.renderButton(meetup.data.is_subscribed)}
            </Form>
          </Content>
        </Container>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({ meetup: state.meetup });

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...MeetupActions,
    ...SubscriptionsActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meetup);
