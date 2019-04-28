import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import api from '../../services/api';
import message from '../../utils/message';

import MeetupActions from '../ducks/meetup';

export function* getMeetupRequest({ id }) {
  try {
    const response = yield call(api.get, `/meetups/${id}`);
    yield put(MeetupActions.getMeetupSuccess(response.data));
  } catch (error) {
    message.unexpectedError();
    yield put(MeetupActions.getMeetupFailure(error));
  }
}

export function* addMeetupRequest({ data, topics }) {
  try {
    const response = yield call(api.post, '/meetups', { ...data, topics });
    yield put(push(`/meetup?id=${response.data.id}`));
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
      yield put(MeetupActions.addMeetupFailure(error));
    }
  }
}
