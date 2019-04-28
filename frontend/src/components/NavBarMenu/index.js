import React from 'react';
import { withRouter } from 'react-router-dom';

import { Menu, Item, Link } from './styles';

const NavBarMenu = () => (
  <Menu>
    <Item>
      <Link to="/">Início</Link>
    </Item>
    <Item>
      <Link to="/search">Buscar</Link>
    </Item>
    <Item>
      <Link to="/new">Novo meetup</Link>
    </Item>
  </Menu>
);

export default withRouter(NavBarMenu);
