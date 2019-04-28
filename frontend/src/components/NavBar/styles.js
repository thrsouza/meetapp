import styled from 'styled-components';
import { Link as link } from 'react-router-dom';

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const Nav = styled.nav`
  align-items: center;
  background-color: #e5556e;
  color: #ffffff;
  display: flex;
  height: 70px;
  justify-content: space-between;
  padding: 30px;
  position: fixed;
  width: 100%;
  z-index: 1000;
`;

export const Link = styled(link)`
  color: #ffffff;
  font-weight: bold;
  text-decoration: none;
`;

export const Button = styled.button.attrs({ type: 'button' })`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  background: none;
  border: none;
  margin-left: 25px;
  cursor: pointer;
`;
