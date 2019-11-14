import { all, takeLatest } from 'redux-saga/effects';

import history from '~/services/history';

function edit() {
  history.push('/alunos/editar');
}

export default all([takeLatest('@student/EDIT', edit)]);
