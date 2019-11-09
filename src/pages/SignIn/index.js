import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { SignInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.svg';

export default function SignIn() {
  const loading = useSelector(state => state.auth.loading);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email valido')
      .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(SignInRequest(email, password));
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <img src={logo} alt="GymPoint" />
      <div>
        <strong>SEU E-MAIL</strong>
        <Input name="email" placeholder="exemplo@email.com" />
      </div>
      <div>
        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="*************" />
      </div>

      <button type="submit">
        {loading ? 'Carregando...' : 'Entrar no sistema'}
      </button>
    </Form>
  );
}
