import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { SignInSuccess, SIgnInFailure } from './actions';

import api from '~/services/api';

export function* SignIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = call(api.post, '/session', {
      params: {
        email,
        password,
      },
    });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(SignInSuccess(token, user));
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados!');
    yield put(SIgnInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', SignIn)]);
