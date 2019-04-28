import React from 'react';
import PropTypes from 'prop-types';

import { Section, Link } from './styles';

const LinkButton = ({ href, text }) => (
  <Section>
    <Link to={href}>{text}</Link>
  </Section>
);

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default LinkButton;
