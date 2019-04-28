import { call, put } from 'redux-saga/effects';

import api from '../../services/api';

import SubscriptionsActions from '../ducks/subscriptions';
import MeetupActions from '../ducks/meetup';

import message from '../../utils/message';

export function* getSubscriptionsRequest({ filter }) {
  try {
    let uri = '/meetups/subscriptions';

    if (filter) {
      uri = `${uri}?filter=${filter}`;
    }

    const response = yield call(api.get, uri);
    yield put(SubscriptionsActions.getSubscriptionsSuccess(response.data));
  } catch (error) {
    yield put(SubscriptionsActions.getSubscriptionsFailure(error));
  }
}

export function* addSubscriptionsRequest({ meetup_id }) {
  try {
    yield call(api.post, '/meetups/subscriptions', { meetup_id });
    yield put(MeetupActions.getMeetupRequest(meetup_id));
    message.success('Inscrição realizada!');
  } catch (error) {
    yield put(SubscriptionsActions.addSubscriptionsFailure(error));
  }
}
