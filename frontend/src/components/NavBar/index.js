import React from 'react';

import NavBarMenu from '../NavBarMenu';

import storage from '../../utils/storage';

import {
  Nav, Container, Link, Button,
} from './styles';

import logo from '../../assets/images/logo-white.svg';

const NavBar = () => (
  <Nav>
    <Container>
      <img src={logo} alt="Meetapp" />
      <NavBarMenu />
    </Container>
    <div>
      <Link to="/profile">
        <i className="far fa-user" />
      </Link>
      <Button
        onClick={() => {
          storage.removeUser();
          storage.removeToken();
          window.location.reload();
        }}
      >
        <i className="fas fa-power-off" />
      </Button>
    </div>
  </Nav>
);

export default NavBar;
