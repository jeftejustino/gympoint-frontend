import { all, takeLatest } from 'redux-saga/effects';

import history from '~/services/history';

function edit() {
  history.push('/matriculas/editar');
}

function create() {
  history.push('/matriculas/adicionar');
}

export default all([
  takeLatest('@registration/EDIT', edit),
  takeLatest('@registration/CREATE', create),
]);
