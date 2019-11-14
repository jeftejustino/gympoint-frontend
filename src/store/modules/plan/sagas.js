import { all, takeLatest } from 'redux-saga/effects';

import history from '~/services/history';

function edit() {
  history.push('/planos/editar');
}

export default all([takeLatest('@plan/EDIT', edit)]);
