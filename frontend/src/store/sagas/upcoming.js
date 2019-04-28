import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import UpcomingActions from '../ducks/upcoming';

export function* getUpcomingRequest({ filter }) {
  try {
    let uri = '/meetups/upcoming';

    if (filter) {
      uri = `${uri}?filter=${filter}`;
    }

    const response = yield call(api.get, uri);
    yield put(UpcomingActions.getUpcomingSuccess(response.data));
  } catch (error) {
    yield put(UpcomingActions.getUpcomingFailure('Ocorreu um erro inexperado!'));
  }
}
