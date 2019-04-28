import React from 'react';
import PropTypes from 'prop-types';

import MeetupCard from '../MeetupCard';

import { Container, Title, Section } from './styles';

const MeetupCardList = ({ title, data }) => {
  if (data && Number(data.total) > 0) {
    return (
      <Container>
        <Title>{title}</Title>
        <Section>
          {data.data.map(item => (
            <MeetupCard key={item.id} item={item} />
          ))}
        </Section>
      </Container>
    );
  }

  return null;
};

MeetupCardList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    total: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape().isRequired),
  }),
};

MeetupCardList.defaultProps = {
  data: null,
};

export default MeetupCardList;
