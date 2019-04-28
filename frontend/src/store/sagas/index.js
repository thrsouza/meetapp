import { all, takeLatest } from 'redux-saga/effects';

import { SessionTypes } from '../ducks/session';
import { addSessionRequest } from './session';

import { ThemesTypes } from '../ducks/themes';
import { getThemesRequest } from './themes';

import { UserTypes } from '../ducks/user';
import { addUserRequest, getUserRequest, updateUserRequest } from './user';

import { SubscriptionsTypes } from '../ducks/subscriptions';
import { getSubscriptionsRequest, addSubscriptionsRequest } from './subscriptions';

import { UpcomingTypes } from '../ducks/upcoming';
import { getUpcomingRequest } from './upcoming';

import { RecommendedTypes } from '../ducks/recommended';
import { getRecommendedRequest } from './recommended';

import { MeetupTypes } from '../ducks/meetup';
import { getMeetupRequest, addMeetupRequest } from './meetup';

import { FileTypes } from '../ducks/file';
import { addFileRequest } from './file';

export default function* rootSaga() {
  yield all([
    takeLatest(SessionTypes.ADD_SESSION_REQUEST, addSessionRequest),
    takeLatest(ThemesTypes.GET_THEMES_REQUEST, getThemesRequest),
    takeLatest(UserTypes.ADD_USER_REQUEST, addUserRequest),
    takeLatest(UserTypes.GET_USER_REQUEST, getUserRequest),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUserRequest),
    takeLatest(SubscriptionsTypes.GET_SUBSCRIPTIONS_REQUEST, getSubscriptionsRequest),
    takeLatest(SubscriptionsTypes.ADD_SUBSCRIPTIONS_REQUEST, addSubscriptionsRequest),
    takeLatest(UpcomingTypes.GET_UPCOMING_REQUEST, getUpcomingRequest),
    takeLatest(RecommendedTypes.GET_RECOMMENDED_REQUEST, getRecommendedRequest),
    takeLatest(MeetupTypes.GET_MEETUP_REQUEST, getMeetupRequest),
    takeLatest(MeetupTypes.ADD_MEETUP_REQUEST, addMeetupRequest),
    takeLatest(FileTypes.ADD_FILE_REQUEST, addFileRequest),
  ]);
}
