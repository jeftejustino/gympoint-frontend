import { all, takeLatest } from 'redux-saga/effects';

import history from '~/services/history';

function edit() {
  history.push('/planos/editar');
}

function create() {
  history.push('/planos/adicionar');
}

export default all([
  takeLatest('@plan/EDIT', edit),
  takeLatest('@plan/CREATE', create),
]);