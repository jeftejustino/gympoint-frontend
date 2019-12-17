import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import { Container, LoadingContainer } from './styles';
import { FormContainer, OneLine } from '~/styles/form';
import { TitleActions, Title, Actions } from '~/styles/titleActions';
import api from '~/services/api';

export default function ComponentForm() {
  const Schema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Nome precisa ter pelo menos 3 caracteres')
      .required('Nome é obrigatório!'),
    email: Yup.string()
      .email('Informe um email valido!')
      .required('Email é obrigatório!'),
    age: Yup.number()
      .typeError('Informe sua idade corretamente!')
      .integer('Informe sua idade corretamente!')
      .moreThan(0, 'Informe sua idade corretamente!')
      .lessThan(150, 'Informe sua idade corretamente!')
      .required('Idade é obrigatória!'),
    weight: Yup.number('Informe seu peso corretamente!')
      .typeError('Informe seu peso corretamente!')
      .moreThan(0, 'Informe seu peso corretamente!')
      .lessThan(600, 'Informe seu peso corretamente!')
      .required('Peso é obrigatório!'),
    height: Yup.number('Informe sua altura corretamente!')
      .typeError('Informe sua altura corretamente!')
      .moreThan(0, 'Informe sua altura corretamente!')
      .lessThan(3, 'Informe sua altura corretamente!')
      .required('Altura é obrigatória!'),
  });

  const { student_id } = useParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getStudent() {
      try {
        setLoading(true);
        const response = await api.get('/students', {
          params: {
            id: student_id,
          },
        });

        setStudent(response.data[0]);
      } catch (error) {
        toast.error('Falha ao buscar alunos!\nTente novamente mais tarde!');
      } finally {
        setLoading(false);
      }
    }

    if (student_id) getStudent();
  }, [student_id]);

  async function handleSubmit(data) {
    try {
      if (student_id) {
        const response = await api.put(`student/${student_id}`, data);
        toast.success('Estudante atualizado com sucesso!');
        setStudent(response.data);
      } else {
        const response = await api.post('student', data);
        toast.success('Estudante salvo com sucesso!');
        setStudent(response.data);
      }
    } catch (error) {
      toast.error(
        'Houve um erro ao salvar! confira os dados e tente novamente!'
      );
    }
  }

  return (
    <Container>
      <Form schema={Schema} onSubmit={handleSubmit} initialData={student}>
        <TitleActions>
          <Title>{student ? 'Edição de aluno' : 'Cadastro de aluno'}</Title>

          <Actions>
            <Link className="cancel" to="/alunos">
              <MdChevronLeft size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit">
              <MdDone size={20} color="#fff" />
              SALVAR
            </button>
          </Actions>
        </TitleActions>
        {loading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          <FormContainer>
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
          </FormContainer>
        )}
      </Form>
    </Container>
  );
}
