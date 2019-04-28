import styled from 'styled-components';
import { Link as link } from 'react-router-dom';

export const Menu = styled.ul`
  display: flex;
  list-style: none;
  padding: 30px;
`;

export const Item = styled.li`
  margin-right: 30px;
`;

export const Link = styled(link)`
  color: #ffffff;
  font-weight: bold;
  text-decoration: none;
`;
