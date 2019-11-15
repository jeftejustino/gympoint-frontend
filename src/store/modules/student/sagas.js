import { all, takeLatest } from 'redux-saga/effects';

import history from '~/services/history';

function edit() {
  history.push('/alunos/editar');
}

function create() {
  history.push('/alunos/adicionar');
}

export default all([
  takeLatest('@student/EDIT', edit),
  takeLatest('@student/CREATE', create),
]);
