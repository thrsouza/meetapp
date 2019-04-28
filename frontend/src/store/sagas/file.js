import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import FileActions from '../ducks/file';

export function* addFileRequest({ file }) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = yield call(api.post, '/files/', formData);

    yield put(FileActions.addFileSuccess(response.data));
  } catch (error) {
    yield put(FileActions.addFileFailure('Ocorreu um erro inexperado!'));
  }
}
