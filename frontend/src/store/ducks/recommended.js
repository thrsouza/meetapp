import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getRecommendedRequest: ['filter'],
  getRecommendedSuccess: ['data'],
  getRecommendedFailure: ['error'],
});

export const RecommendedTypes = Types;
export default Creators;

/* Initial State */

const INITIAL_STATE = Immutable({
  loading: false,
  data: null,
  error: null,
});

/* Reducers */

const getRecommendedRequest = state => state.merge({
  ...state,
  loading: true,
  error: null,
});

const getRecommendedSuccess = (state, { data }) => state.merge({
  loading: false,
  data,
  error: null,
});

const getRecommendedFailure = (state, { error }) => state.merge({
  ...state,
  loading: false,
  error,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_RECOMMENDED_REQUEST]: getRecommendedRequest,
  [Types.GET_RECOMMENDED_SUCCESS]: getRecommendedSuccess,
  [Types.GET_RECOMMENDED_FAILURE]: getRecommendedFailure,
});
