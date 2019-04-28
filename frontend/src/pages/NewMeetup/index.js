import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import ThemesActions from '../../store/ducks/themes';
import MeetupActions from '../../store/ducks/meetup';

import TextInput from '../../components/TextInput';
import ImageUploader from '../../components/ImageUploader';
import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';
import DateTimeInput from '../../components/DateTimeInput';

import { Container, Content, Form } from './styles';

class NewMeetup extends Component {
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
    file: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
    getThemesRequest: PropTypes.func.isRequired,
    addMeetupRequest: PropTypes.func.isRequired,
  };

  state = {
    titleInput: '',
    descriptionInput: '',
    whenInput: new Date(),
    whereInput: '',
    topics: [],
  };

  componentDidMount() {
    const { getThemesRequest } = this.props;
    getThemesRequest();
  }

  handleSave = (event) => {
    event.preventDefault();

    const { file, addMeetupRequest } = this.props;
    const {
      titleInput, descriptionInput, whenInput, whereInput, topics,
    } = this.state;

    const data = {
      title: titleInput,
      description: descriptionInput,
      file_id: file.data ? file.data.id : null,
      when: moment(whenInput).format('YYYY-MM-DD HH:mm:ss'),
      where: whereInput,
    };

    addMeetupRequest(data, topics);
  };

  handleCheckBoxChange = async (themeId) => {
    let { topics } = this.state;

    if (topics.find(id => id === themeId)) {
      topics = topics.filter(id => id !== themeId);
    } else {
      topics.push(themeId);
    }

    this.setState({ topics });
  };

  render() {
    const { themes } = this.props;
    const {
      titleInput, descriptionInput, whenInput, whereInput, topics,
    } = this.state;

    return (
      <Container>
        <Content>
          <Form onSubmit={this.handleSave}>
            <TextInput
              name="title"
              type="text"
              label="Título"
              placeholder="Digite o título do meetup"
              value={titleInput}
              onChange={(event) => {
                this.setState({ titleInput: event.target.value });
              }}
            />
            <TextInput
              name="description"
              type="text"
              label="Descrição"
              placeholder="Descreva seu meetup"
              value={descriptionInput}
              onChange={(event) => {
                this.setState({ descriptionInput: event.target.value });
              }}
            />
            <DateTimeInput
              name="when"
              label="Data/Hora"
              placeholder="Quando o meetup vai acontecer?"
              value={whenInput}
              onChange={(data) => {
                this.setState({ whenInput: data });
              }}
            />
            <ImageUploader name="file_id" />
            <TextInput
              name="where"
              type="text"
              label="Localização"
              placeholder="Onde seu meetup irá acontecer?"
              value={whereInput}
              onChange={(event) => {
                this.setState({ whereInput: event.target.value });
              }}
            />
            <h4>Tema do meetup</h4>
            {themes.data
              && themes.data.data.map(theme => (
                <CheckBox
                  key={theme.id}
                  value={theme.id}
                  text={theme.description}
                  checked={!!topics.find(id => id === theme.id)}
                  onChange={() => this.handleCheckBoxChange(theme.id)}
                />
              ))}
            <Button>Salvar</Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.themes,
  file: state.file,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...ThemesActions,
    ...MeetupActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMeetup);
