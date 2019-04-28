import styled from 'styled-components';

export const Container = styled.div`
  padding: 7px 4px;
  display: flex;
  align-items: center;
`;

export const Check = styled.input.attrs({ type: 'checkbox' })`
  border-radius: 4px;
  width: 20px;
  height: 20px;
  appearance: none;
  outline: 0;
  background: #544b57;

  :checked {
    background: #f64067;
  }
`;

export const Span = styled.span`
  font-weight: bold;
  margin-left: 10px;
`;
