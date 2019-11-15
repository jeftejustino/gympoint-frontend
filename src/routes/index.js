import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import StudentsList from '~/pages/Students/List';
import StudentsForm from '~/pages/Students/Form';
import PlansList from '~/pages/Plans/List';
import PlansForm from '~/pages/Plans/Form';
import RegistrationsList from '~/pages/Registrations/List';
import RegistrationsForm from '~/pages/Registrations/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/alunos/adicionar" isPrivate component={StudentsForm} />
      <Route path="/alunos/editar" isPrivate component={StudentsForm} />
      <Route path="/alunos" isPrivate component={StudentsList} />

      <Route path="/planos/adicionar" isPrivate component={PlansForm} />
      <Route path="/planos/editar" isPrivate component={PlansForm} />
      <Route path="/planos" isPrivate component={PlansList} />

      <Route
        path="/matriculas/adicionar"
        isPrivate
        component={RegistrationsForm}
      />
      <Route
        path="/matriculas/editar"
        isPrivate
        component={RegistrationsForm}
      />
      <Route path="/matriculas" isPrivate component={RegistrationsList} />
    </Switch>
  );
}
