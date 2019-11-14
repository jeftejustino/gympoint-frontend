import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import student from './student/reducer';
import plan from './plan/reducer';

const reducers = combineReducers({
  auth,
  user,
  student,
  plan,
});

export default reducers;
