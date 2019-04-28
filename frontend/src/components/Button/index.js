import React from 'react';
import PropTypes from 'prop-types';

import { ButtonSubmit } from './styles';

const Button = ({ children, color, loading }) => (
  <ButtonSubmit color={color}>
    {loading ? <i className="fas fa-circle-notch fa-spin" /> : children}
  </ButtonSubmit>
);

Button.propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  color: '#e5556e',
  loading: false,
};

export default Button;
