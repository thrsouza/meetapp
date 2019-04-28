import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ThemesActions from '../../store/ducks/themes';
import UserActions from '../../store/ducks/user';

import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';

import { Container, Content, Form } from './styles';

class Preferences extends Component {
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
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    getThemesRequest: PropTypes.func.isRequired,
    updateUserRequest: PropTypes.func.isRequired,
  };

  state = {
    preferences: [],
  };

  componentDidMount() {
    const { getThemesRequest } = this.props;
    getThemesRequest();
  }

  handleCheckBoxChange = async (themeId) => {
    let { preferences } = this.state;

    if (preferences.find(id => id === themeId)) {
      preferences = preferences.filter(id => id !== themeId);
    } else {
      preferences.push(themeId);
    }

    this.setState({ preferences });
  };

  handleContinue = async (event) => {
    event.preventDefault();

    const { preferences } = this.state;
    const { user, updateUserRequest } = this.props;

    updateUserRequest(user, preferences);
  };

  render() {
    const { user, themes } = this.props;
    const { preferences } = this.state;

    return (
      <Container>
        <Content>
          <h2>{`Olá, ${user.name.split(' ')[0]}`}</h2>
          <p>
            Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para
            selecionarmos os melhores meetups pra você:
          </p>
          <Form onSubmit={this.handleContinue}>
            <h4>Preferências</h4>
            {themes.data
              && themes.data.data.map(theme => (
                <CheckBox
                  key={theme.id}
                  value={theme.id}
                  text={theme.description}
                  checked={!!preferences.find(preference => preference === theme.id)}
                  onChange={() => this.handleCheckBoxChange(theme.id)}
                />
              ))}
            <Button>Continuar</Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
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
)(Preferences);
