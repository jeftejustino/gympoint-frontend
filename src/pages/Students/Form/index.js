import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { MdDone, MdChevronLeft } from 'react-icons/md';

import { Container } from './styles';
import { FormContainer, OneLine } from '~/styles/form';
import { TitleActions, Title, Actions } from '~/styles/titleActions';

export default function ComponentForm() {
  return (
    <Container>
      <TitleActions>
        <Title>Cadastro de aluno</Title>

        <Actions>
          <Link className="cancel" to="/alunos">
            <MdChevronLeft size={20} color="#fff" />
            VOLTAR
          </Link>
          <button type="button" onClick={() => {}}>
            <MdDone size={20} color="#fff" />
            SALVAR
          </button>
        </Actions>
      </TitleActions>
      <FormContainer>
        <Form>
          <div>
            <strong>NOME COMPLETO</strong>
            <Input name="name" placeholder="John Doe" />
          </div>

          <div>
            <strong>ENDEREÇO DE E-MAIL</strong>
            <Input name="email" placeholder="exemplo@email.com" />
          </div>

          <OneLine>
            <div>
              <strong>IDADE</strong>
              <Input name="age" />
            </div>
            <div>
              <strong>PESO (em kg)</strong>
              <Input name="weight" />
            </div>
            <div>
              <strong>ALTURA</strong>
              <Input name="height" />
            </div>
          </OneLine>
        </Form>
      </FormContainer>
    </Container>
  );
}
