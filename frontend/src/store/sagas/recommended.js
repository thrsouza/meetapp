import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import RecommendedActions from '../ducks/recommended';

export function* getRecommendedRequest({ filter }) {
  try {
    let uri = '/meetups/recommended';

    if (filter) {
      uri = `${uri}?filter=${filter}`;
    }

    const response = yield call(api.get, uri);

    yield put(RecommendedActions.getRecommendedSuccess(response.data));
  } catch (error) {
    yield put(RecommendedActions.getRecommendedFailure('Ocorreu um erro inexperado!'));
  }
}
