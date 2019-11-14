import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import student from './student/reducer';

const reducers = combineReducers({
  auth,
  user,
  student,
});

export default reducers;
