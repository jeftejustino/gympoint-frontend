import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

export function* SignIn({ payload }) {}

export default all([takeLatest('@user/ALGUMA_REQUEST', SignIn)]);
