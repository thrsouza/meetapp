import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

import { Container, Label } from './styles';

const DateTimeInput = (props) => {
  const {
    label, name, value, placeholder, onChange,
  } = props;

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <DatePicker
        name={name}
        placeholderText={placeholder}
        showTimeSelect
        timeIntervals={60}
        dateFormat="dd/MM/yyyy HH:mm"
        selected={value}
        onChange={onChange}
      />
    </Container>
  );
};

DateTimeInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

DateTimeInput.defaultProps = {
  placeholder: '',
};

export default DateTimeInput;
