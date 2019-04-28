import React from 'react';
import PropTypes from 'prop-types';

import { Section, Label, Input } from './styles';

const TextInput = (props) => {
  const {
    label, name, type, placeholder, value, onChange,
  } = props;

  return (
    <Section>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
      />
    </Section>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  value: '',
  placeholder: '',
};

export default TextInput;
