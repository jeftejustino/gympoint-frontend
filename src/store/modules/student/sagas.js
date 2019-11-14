import { all, put, takeLatest } from 'redux-saga/effects';

import history from '~/services/history';

import { editStudent } from './actions';

function edit(payload) {
  const { student } = payload;

  put(editStudent(student));

  history.push('/alunos/editar');
}

export default all([takeLatest('@student/EDIT', edit)]);
