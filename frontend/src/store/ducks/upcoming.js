import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getUpcomingRequest: ['filter'],
  getUpcomingSuccess: ['data'],
  getUpcomingFailure: ['error'],
});

export const UpcomingTypes = Types;
export default Creators;

/* Initial State */

const INITIAL_STATE = Immutable({
  loading: false,
  data: null,
  error: null,
});

/* Reducers */

const getUpcomingRequest = state => state.merge({
  ...state,
  loading: true,
  error: null,
});

const getUpcomingSuccess = (state, { data }) => state.merge({
  loading: false,
  data,
  error: null,
});

const getUpcomingFailure = (state, { error }) => state.merge({
  ...state,
  loading: false,
  error,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_UPCOMING_REQUEST]: getUpcomingRequest,
  [Types.GET_UPCOMING_SUCCESS]: getUpcomingSuccess,
  [Types.GET_UPCOMING_FAILURE]: getUpcomingFailure,
});
