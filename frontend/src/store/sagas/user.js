import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import api from '../../services/api';
import message from '../../utils/message';

import UserActions from '../ducks/user';

export function* addUserRequest({ data }) {
  const { name, email, password } = data;

  try {
    yield call(api.post, '/users/', {
      name,
      email,
      password,
    });
    yield put(push('/signin'));
    message.success('Conta criada com sucesso!');
  } catch (error) {
    try {
      const { response } = error;
      if (response.status === 400) {
        message.invalidFieldsError(response);
      } else {
        message.unexpectedError();
      }
    } catch {
      message.unexpectedError();
    } finally {
      yield put(UserActions.addUserFailure(error));
    }
  }
}

export function* getUserRequest({ id }) {
  try {
    const response = yield call(api.get, `/users/${id}`);

    const data = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    };

    const preferences = response.data.preferences.map(p => p.theme_id);

    yield put(UserActions.getUserSuccess(data, preferences));
  } catch (error) {
    yield put(UserActions.getUserFailure('Ocorreu um erro inexperado!'));
  }
}

export function* updateUserRequest({ data, preferences }) {
  const {
    id, name, password, password_confirmation,
  } = data;

  try {
    if (password && password.length > 0) {
      yield call(api.put, `/users/${id}`, {
        name,
        password,
        password_confirmation,
        preferences,
      });
    } else {
      yield call(api.put, `/users/${id}`, { name, preferences });
    }
    yield put(push('/'));
    message.success();
  } catch (error) {
    try {
      const { response } = error;
      if (response.status === 400) {
        message.invalidFieldsError(response);
      } else {
        message.unexpectedError();
      }
    } catch {
      message.unexpectedError();
    } finally {
      yield put(UserActions.updateUserFailure(error));
    }
  }
}
