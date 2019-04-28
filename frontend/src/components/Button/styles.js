import styled from 'styled-components';

export const ButtonSubmit = styled.button.attrs({ type: 'submit' })`
  background-color: ${props => props.color};
  border: none;
  border-radius: 500px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 14px;
  width: 100%;
  cursor: pointer;
`;
