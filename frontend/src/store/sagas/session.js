import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import api from '../../services/api';
import storage from '../../utils/storage';
import message from '../../utils/message';

import SessionActions from '../ducks/session';

export function* addSessionRequest({ email, password }) {
  try {
    const response = yield call(api.post, '/sessions', { email, password });

    const { user, token, isFirstAccess } = response.data;

    storage.setToken(token);
    storage.setUser(user);

    yield put(SessionActions.addSessionSuccess(user, token));

    if (!isFirstAccess) {
      yield put(push('/'));
    } else {
      yield put(push('/preferences'));
    }
  } catch (error) {
    try {
      const { response } = error;
      if (response.status === 401) {
        message.error('Credenciais inválidas!');
      } else if (response.status === 400) {
        message.invalidFieldsError(response);
      } else {
        message.unexpectedError();
      }
    } catch {
      message.unexpectedError();
    } finally {
      yield put(SessionActions.addSessionFailure(error));
    }
  }
}
