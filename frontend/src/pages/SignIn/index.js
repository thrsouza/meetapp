import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SessionActions from '../../store/ducks/session';

import logo from '../../assets/images/logo.svg';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import LinkButton from '../../components/LinkButton';

import { Container, Form } from './styles';

class SignIn extends Component {
  static propTypes = {
    session: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    addSessionRequest: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  handleSignIn = async (event) => {
    event.preventDefault();

    const { addSessionRequest } = this.props;
    const { email, password } = this.state;

    addSessionRequest(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { session } = this.props;

    return (
      <Container>
        <img src={logo} alt="Meetapp" />
        <Form onSubmit={this.handleSignIn}>
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
          <Button loading={session.loading}>Entrar</Button>
          <LinkButton href="/signup" text="Criar conta grátis" />
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => bindActionCreators(SessionActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
