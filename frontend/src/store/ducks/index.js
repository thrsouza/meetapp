import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as session } from './session';
import { reducer as user } from './user';
import { reducer as themes } from './themes';
import { reducer as subscriptions } from './subscriptions';
import { reducer as upcoming } from './upcoming';
import { reducer as recommended } from './recommended';
import { reducer as meetup } from './meetup';
import { reducer as file } from './file';

export default history => combineReducers({
  router: connectRouter(history),
  session,
  user,
  themes,
  subscriptions,
  upcoming,
  recommended,
  meetup,
  file,
});
