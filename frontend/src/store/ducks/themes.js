import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getThemesRequest: [],
  getThemesSuccess: ['data'],
  getThemesFailure: ['error'],
});

export const ThemesTypes = Types;
export default Creators;

/* Initial State */

const INITIAL_STATE = Immutable({
  loading: false,
  data: null,
  error: null,
});

/* Reducers */

const getThemesRequest = state => state.merge({
  ...state,
  loading: true,
  error: null,
});

const getThemesSuccess = (state, { data }) => state.merge({
  loading: false,
  data,
  error: null,
});

const getThemesFailure = (state, { error }) => state.merge({
  ...state,
  loading: false,
  error,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_THEMES_REQUEST]: getThemesRequest,
  [Types.GET_THEMES_SUCCESS]: getThemesSuccess,
  [Types.GET_THEMES_FAILURE]: getThemesFailure,
});
