import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  resetMeetupState: ['id'],
  getMeetupRequest: ['id'],
  getMeetupSuccess: ['data'],
  getMeetupFailure: ['error'],
  addMeetupRequest: ['data', 'topics'],
  addMeetupFailure: ['error'],
});

export const MeetupTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  loading: false,
  data: null,
  error: null,
});

/* Reducers */

const resetMeetupState = state => state.merge({
  loading: false,
  data: null,
  error: null,
});

const getMeetupRequest = state => state.merge({
  loading: true,
  data: null,
  error: null,
});

const getMeetupSuccess = (state, { data }) => state.merge({
  data,
  error: null,
  loading: false,
});

const getMeetupFailure = (state, { error }) => state.merge({
  ...state,
  error,
  loading: false,
});

const addMeetupRequest = state => state.merge({
  ...state,
  loading: true,
  error: null,
});

const addMeetupFailure = (state, { error }) => state.merge({
  ...state,
  error,
  loading: false,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_MEETUP_STATE]: resetMeetupState,
  [Types.GET_MEETUP_REQUEST]: getMeetupRequest,
  [Types.GET_MEETUP_SUCCESS]: getMeetupSuccess,
  [Types.GET_MEETUP_FAILURE]: getMeetupFailure,
  [Types.ADD_MEETUP_REQUEST]: addMeetupRequest,
  [Types.ADD_MEETUP_FAILURE]: addMeetupFailure,
});
