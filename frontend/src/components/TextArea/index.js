import React from 'react';
import PropTypes from 'prop-types';

import { Section, Label, Input } from './styles';

const TextInput = (props) => {
  const {
    label, name, placeholder, onChange,
  } = props;

  return (
    <Section>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
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
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  placeholder: '',
};

export default TextInput;
