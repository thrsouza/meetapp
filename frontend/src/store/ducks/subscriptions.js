import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getSubscriptionsRequest: ['filter'],
  getSubscriptionsSuccess: ['data'],
  getSubscriptionsFailure: ['error'],
  addSubscriptionsRequest: ['meetup_id'],
  addSubscriptionsFailure: ['error'],
});

export const SubscriptionsTypes = Types;
export default Creators;

/* Initial State */

const INITIAL_STATE = Immutable({
  loading: false,
  data: null,
  error: null,
});

/* Reducers */

const getSubscriptionsRequest = state => state.merge({
  ...state,
  loading: true,
  error: null,
});

const getSubscriptionsSuccess = (state, { data }) => state.merge({
  loading: false,
  data,
  error: null,
});

const getSubscriptionsFailure = (state, { error }) => state.merge({
  ...state,
  loading: false,
  error,
});

const addSubscriptionsRequest = state => state.merge({
  ...state,
});

const addSubscriptionsFailure = (state, { error }) => state.merge({
  ...state,
  loading: false,
  error,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUBSCRIPTIONS_REQUEST]: getSubscriptionsRequest,
  [Types.GET_SUBSCRIPTIONS_SUCCESS]: getSubscriptionsSuccess,
  [Types.GET_SUBSCRIPTIONS_FAILURE]: getSubscriptionsFailure,
  [Types.ADD_SUBSCRIPTIONS_REQUEST]: addSubscriptionsRequest,
  [Types.ADD_SUBSCRIPTIONS_FAILURE]: addSubscriptionsFailure,
});
