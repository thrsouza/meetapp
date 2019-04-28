import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 100px 0;
  width: 100%;
  max-width: 930px;
`;

export const Header = styled.div`
  padding: 10px;
`;

export const SearchBox = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  color: #8e8e93;
  border: none;
  border-radius: 3px;
  background-color: #2f2d38;
`;

export const InputSearch = styled.input.attrs({ type: 'text' })`
  width: 100%;
  margin-left: 16px;
  border: none;
  background-color: #2f2d38;
  color: #ffffff;
`;
