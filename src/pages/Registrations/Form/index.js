import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO } from 'date-fns';

import { Container } from './styles';
import { FormContainer, OneLine } from '~/styles/form';
import { TitleActions, Title, Actions } from '~/styles/titleActions';
import api from '~/services/api';

import Select from '~/components/SelectInput';
import DatePicker from '~/components/DatePicker';

import { editRegistration } from '~/store/modules/registration/actions';

export default function RegistrationForm() {
  const [plans, setPlans] = useState([]);

  const dispatch = useDispatch();

  const registration = useSelector(state => {
    let regis = state.registration.registration;
    if (regis) {
      regis = {
        id: regis.id,
        start_date: parseISO(regis.start_date),
        student_id: { value: regis.student.id, label: regis.student.name },
        plan_id: { value: regis.plan.id, label: regis.plan.title },
      };
    }

    return regis;
  });

  const Schema = Yup.object().shape({
    student_id: Yup.number()
      .integer()
      .typeError('Informe o aluno!')
      .required('Informe o aluno!'),
    plan_id: Yup.number()
      .integer()
      .typeError('Informe o plano!')
      .required('Informe o plano!'),
    start_date: Yup.date()
      .typeError('Informe a data de inicio!')
      .required('Informe a data de inicio!'),
  });

  useEffect(() => {
    async function getPlans() {
      try {
        const response = await api.get('/plans');

        const data = response.data.map(plan => ({
          value: plan.id,
          label: plan.title,
        }));

        setPlans(data);
      } catch (error) {
        toast.error('Falhar ao buscar alunos!\nTente novamente mais tarde!');
      }
    }

    getPlans();
  }, []);

  async function handleSubmit(data) {
    try {
      if (registration) {
        const response = await api.put(
          `registrations/${registration.id}`,
          data
        );
        toast.success('Matrícula atualizada com sucesso!');
        dispatch(editRegistration(response.data));
      } else {
        const response = await api.post('registrations', data);
        toast.success('Matrículas salva com sucesso!');
        dispatch(editRegistration(response.data));
      }
    } catch (error) {
      toast.error(
        'Houve um erro ao salvar! confira os dados e tente novamente!'
      );
    }
  }

  async function loadOptionsStudents(search, callback) {
    try {
      const response = await api.get('/students', {
        params: {
          q: search,
        },
      });

      const data = response.data.map(student => ({
        value: student.id,
        label: student.name,
      }));
      callback(data);
    } catch (error) {
      console.tron.warn('Error ao buscar alunos!');
    }
  }

  return (
    <Container>
      <Form schema={Schema} onSubmit={handleSubmit} initialData={registration}>
        <TitleActions>
          <Title>
            {registration ? 'Edição de Matrícula' : 'Cadastro de Matrícula'}
          </Title>

          <Actions>
            <Link className="cancel" to="/matriculas">
              <MdChevronLeft size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit">
              <MdDone size={20} color="#fff" />
              SALVAR
            </button>
          </Actions>
        </TitleActions>
        <FormContainer>
          <div>
            <strong>ALUNO</strong>
            <Select name="student_id" options={loadOptionsStudents} />
          </div>

          <OneLine>
            <div>
              <strong>PLANO</strong>
              <Select name="plan_id" options={plans} />
            </div>
            <div>
              <strong>DATA DE INÍCIO</strong>
              <DatePicker name="start_date" />
            </div>
            <div />
          </OneLine>
        </FormContainer>
      </Form>
    </Container>
  );
}
