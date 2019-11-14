import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import StudentsList from '~/pages/Students/List';
import StudentsForm from '~/pages/Students/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/alunos/adicionar" isPrivate component={StudentsForm} />
      <Route path="/alunos/editar" isPrivate component={StudentsForm} />
      <Route path="/alunos" isPrivate component={StudentsList} />
    </Switch>
  );
}
