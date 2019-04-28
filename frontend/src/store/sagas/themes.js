import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import ThemesActions from '../ducks/themes';

export function* getThemesRequest() {
  try {
    const response = yield call(api.get, '/meetups/themes');
    yield put(ThemesActions.getThemesSuccess(response.data));
  } catch (error) {
    yield put(ThemesActions.getThemesFailure('Ocorreu um erro inexperado!'));
  }
}
