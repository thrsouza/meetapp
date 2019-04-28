import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  Container, Footer, Info, Title, Subtitle, Button,
} from './styles';

const MeetupCard = ({ item, history }) => (
  <Container backgroundImage={item.file.url}>
    <Footer>
      <Info>
        <Title>{item.title}</Title>
        <Subtitle>{`${item.__meta__.subscriptions_count} membros`}</Subtitle>
      </Info>
      <Button onClick={() => history.push(`/meetup?id=${item.id}`)}>
        <i className="fas fa-chevron-right" />
      </Button>
    </Footer>
  </Container>
);

MeetupCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    file: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    __meta__: PropTypes.shape({
      subscriptions_count: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(MeetupCard);
