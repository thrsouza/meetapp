import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  addUserRequest: ['data'],
  addUserSuccess: ['data'],
  addUserFailure: ['error'],
  getUserRequest: ['id'],
  getUserSuccess: ['data', 'preferences'],
  getUserFailure: ['error'],
  updateUserRequest: ['data', 'preferences'],
  updateUserFailure: ['error'],
  updateUserData: ['data'],
  updateUserPreferences: ['id'],
});

export const UserTypes = Types;
export default Creators;

/* Initial State */

const INITIAL_STATE = Immutable({
  loading: false,
  data: null,
  preferences: [],
  error: null,
});

/* Reducers */

const addUserRequest = state => state.merge({
  ...state,
  loading: true,
  error: null,
});

const addUserSuccess = (state, { data }) => state.merge({
  loading: true,
  data,
  error: null,
});

const addUserFailure = (state, { error }) => state.merge({
  ...state,
  loading: false,
  error,
});

const getUserRequest = state => state.merge({
  ...state,
  loading: true,
  error: null,
});

const getUserSuccess = (state, { data, preferences }) => state.merge({
  loading: true,
  data,
  preferences,
  error: null,
});

const getUserFailure = (state, { error }) => state.merge({
  ...state,
  loading: false,
  error,
});

const updateUserRequest = state => state.merge({
  ...state,
  loading: true,
  error: null,
});

const updateUserFailure = (state, { error }) => state.merge({
  ...state,
  loading: false,
  error,
});

const updateUserData = (state, { data }) => state.merge({
  ...state,
  data,
});

const updateUserPreferences = (state, { id }) => state.merge({
  ...state,
  preferences: state.preferences.find(preference => preference === id)
    ? state.preferences.filter(preference => preference !== id)
    : [...state.preferences, id],
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_USER_REQUEST]: addUserRequest,
  [Types.ADD_USER_SUCCESS]: addUserSuccess,
  [Types.ADD_USER_FAILURE]: addUserFailure,
  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,
  [Types.UPDATE_USER_REQUEST]: updateUserRequest,
  [Types.UPDATE_USER_FAILURE]: updateUserFailure,
  [Types.UPDATE_USER_DATA]: updateUserData,
  [Types.UPDATE_USER_PREFERENCES]: updateUserPreferences,
});
