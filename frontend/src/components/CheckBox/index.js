import React from 'react';
import PropTypes from 'prop-types';

import { Container, Check, Span } from './styles';

const CheckBox = ({
  value, text, checked, onChange,
}) => (
  <Container>
    <Check value={value} checked={checked} onChange={onChange} />
    <Span>{text}</Span>
  </Container>
);

CheckBox.propTypes = {
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckBox;
