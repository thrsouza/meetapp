import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px 0;

  input[type='text'] {
    background-color: transparent;
    border: none;
    color: #fff;
    display: flex;
    font-size: 20px;
    padding: 5px 0;
    width: 100%;
  }

  .react-datepicker {
    font-family: 'Roboto', sans-serif;
    background-color: #ffffff;
    color: #24202c;
    border: 2px solid #ffffff;
    display: inline-block;
    position: relative;
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    position: inherit;
    width: 100%;
  }

  .react-datepicker__month-container {
    float: left;
    background-color: #ffffff;
    border-radius: 5px;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    margin-top: 0;
    color: #ffffff;
    font-weight: bold;
    font-size: 0.944rem;
  }

  .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle,
  .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::before {
    border-top: none;
    border-bottom-color: #e5556e;
  }

  .react-datepicker__header {
    background-color: #e5556e;
    border-bottom: 1px solid #e5556e;
    color: #ffffff !important;
  }

  .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 110px;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--keyboard-selected:hover,
  .react-datepicker__month-text--keyboard-selected {
    border-radius: 0;
    background-color: #e5556e;
    color: #ffffff;
  }
  .react-datepicker__time-container {
    float: right;
    border-left: 1px solid transparent;
    width: 90px;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    width: 90px;
    overflow-x: hidden;
    margin: 0 auto;
    text-align: center;
  }
`;

export const Label = styled.label`
  color: #ffffff;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;
