import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import storage from '../../utils/storage';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  addSessionRequest: ['email', 'password'],
  addSessionSuccess: ['user', 'token'],
  addSessionFailure: ['error'],
});

export const SessionTypes = Types;
export default Creators;

/* Initial State */

const INITIAL_STATE = Immutable({
  loading: false,
  token: storage.getToken(),
  user: storage.getUser(),
  error: null,
});

/* Reducers */

const addSessionRequest = state => state.merge({
  ...state,
  error: null,
  loading: true,
});

const addSessionSuccess = (state, { user, token }) => state.merge({
  ...state,
  user,
  token,
  error: null,
  loading: false,
});

const addSessionFailure = (state, { error }) => state.merge({
  ...state,
  error,
  loading: false,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_SESSION_REQUEST]: addSessionRequest,
  [Types.ADD_SESSION_SUCCESS]: addSessionSuccess,
  [Types.ADD_SESSION_FAILURE]: addSessionFailure,
});
