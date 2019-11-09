import { all, put, call, takeLatest } from 'redux-saga/effects';

export function SignIn({ payload }) {}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', SignIn)]);
