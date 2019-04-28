import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  resetFileState: [],
  addFileRequest: ['file'],
  addFileSuccess: ['data'],
  addFileFailure: ['error'],
});

export const FileTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  loading: false,
  data: null,
  error: null,
});

/* Reducers */

const resetFileState = state => state.merge({
  loading: false,
  data: null,
  error: null,
});

const addFileRequest = state => state.merge({
  ...state,
  loading: true,
  error: null,
});

const addFileSuccess = (state, { data }) => state.merge({
  ...state,
  data,
  loading: false,
});

const addFileFailure = (state, { error }) => state.merge({
  ...state,
  error,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_FILE_STATE]: resetFileState,
  [Types.ADD_FILE_REQUEST]: addFileRequest,
  [Types.ADD_FILE_SUCCESS]: addFileSuccess,
  [Types.ADD_FILE_FAILURE]: addFileFailure,
});
