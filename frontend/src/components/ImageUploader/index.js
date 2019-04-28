import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import FileActions from '../../store/ducks/file';

import { Container, FileInput } from './styles';

class ImageUploader extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    file: PropTypes.shape({
      data: PropTypes.shape({ url: PropTypes.string.isRequired }),
    }).isRequired,
    addFileRequest: PropTypes.func.isRequired,
    resetFileState: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { resetFileState } = this.props;
    resetFileState();
  }

  render() {
    const { name, file, addFileRequest } = this.props;

    return (
      <Container data={file.data}>
        <>
          <FileInput
            id={name}
            name={name}
            onChange={(event) => {
              const item = event.target.files[0];
              if (item) addFileRequest(item);
            }}
          />
          {!!file.data || <i className="fas fa-camera" />}
        </>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ file: state.file });

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...FileActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageUploader);
