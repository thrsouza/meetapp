import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ThemesActions from '../../store/ducks/themes';
import UserActions from '../../store/ducks/user';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';

import { Container, Form, PreferencesSection } from './styles';

class Profile extends Component {
  static propTypes = {
    themes: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }),
      error: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
    }).isRequired,
    session: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    user: PropTypes.shape({
      data: PropTypes.shape({
        name: PropTypes.string,
        password: PropTypes.string,
        password_confirmation: PropTypes.string,
      }),
      preferences: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    getThemesRequest: PropTypes.func.isRequired,
    getUserRequest: PropTypes.func.isRequired,
    updateUserRequest: PropTypes.func.isRequired,
    updateUserData: PropTypes.func.isRequired,
    updateUserPreferences: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { session, getUserRequest, getThemesRequest } = this.props;
    getUserRequest(session.user.id);
    getThemesRequest();
  }

  handleCheckBoxChange = (event) => {
    const { updateUserPreferences } = this.props;
    const themeId = event.target.value;

    updateUserPreferences(themeId);
  };

  handleSave = (event) => {
    event.preventDefault();

    const { user, updateUserRequest } = this.props;
    const { data, preferences } = user;

    updateUserRequest(data, preferences);
  };

  render() {
    const { user, themes, updateUserData } = this.props;

    if (user.data && user.preferences) {
      return (
        <Container>
          <Form onSubmit={this.handleSave}>
            <TextInput
              name="name"
              type="text"
              label="Nome"
              placeholder="Digite seu nome"
              onChange={(event) => {
                updateUserData({
                  ...user.data,
                  name: event.target.value,
                });
              }}
              value={user.data.name}
            />
            <TextInput
              name="password"
              type="password"
              label="Senha"
              placeholder="Sua senha secreta"
              onChange={(event) => {
                updateUserData({
                  ...user.data,
                  password: event.target.value,
                });
              }}
              value={user.data.password}
            />
            <TextInput
              name="password_confirmation"
              type="password"
              label="Confirmação de senha"
              placeholder="Sua senha secreta"
              onChange={(event) => {
                updateUserData({
                  ...user.data,
                  password_confirmation: event.target.value,
                });
              }}
              value={user.data.password_confirmation}
            />
            <PreferencesSection>
              <h4>Preferências</h4>
              {themes.data
                && themes.data.data.map(theme => (
                  <CheckBox
                    key={theme.id}
                    value={theme.id}
                    text={theme.description}
                    checked={!!user.preferences.find(preference => preference === theme.id)}
                    onChange={this.handleCheckBoxChange}
                  />
                ))}
            </PreferencesSection>
            <Button>Salvar</Button>
          </Form>
        </Container>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  session: state.session,
  user: state.user,
  themes: state.themes,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...ThemesActions,
    ...UserActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
