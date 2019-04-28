import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserActions from '../../store/ducks/user';

import logo from '../../assets/images/logo.svg';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import LinkButton from '../../components/LinkButton';

import { Container, Form } from './styles';

class SignUp extends Component {
  static propTypes = {
    addUserRequest: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
  };

  handleSignIn = async (event) => {
    event.preventDefault();

    const { addUserRequest } = this.props;
    const { name, email, password } = this.state;

    const data = { name, email, password };

    addUserRequest(data);
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Container>
        <img src={logo} alt="Meetapp" />

        <Form onSubmit={this.handleSignIn}>
          <TextInput
            name="name"
            type="name"
            label="Nome"
            value={name}
            placeholder="Digite seu nome"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <TextInput
            name="email"
            type="email"
            label="Email"
            value={email}
            placeholder="Digite seu e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <TextInput
            name="password"
            type="password"
            label="Senha"
            value={password}
            placeholder="Sua senha secreta"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Button>Criar conta</Button>
          <LinkButton href="/signin" text="Já tenho conta" />
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
