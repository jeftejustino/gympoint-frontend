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
import { formatPrice } from '~/util/format';

export default function PlansForm() {
  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'O title precisa ter pelo menos 3 caracteres')
      .required('Titulo é obrigatório!'),
    duration: Yup.number()
      .typeError('Informe a duração corretamente!')
      .integer('Informe a duração corretamente!')
      .moreThan(0, 'Informe a duração corretamente!')
      .required('Duração é obrigatória!'),
    price: Yup.number()
      .typeError('Informe a duração corretamente!')
      .moreThan(0, 'Informe a duração corretamente!')
      .required('Duração é obrigatória!'),
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState({});
  const { plan_id } = useParams();

  useEffect(() => {
    async function getPlan() {
      try {
        setLoading(true);
        const response = await api.get('/plans', {
          params: {
            id: plan_id,
          },
        });

        const data = response.data.map(p => ({
          ...p,
          durationFormated: `${p.duration} ${
            p.duration === 1 ? `mês` : `meses`
          }`,
          priceFormated: formatPrice(p.price),
        }));

        setPlan(data[0]);
      } catch (error) {
        toast.error('Falhar ao buscar alunos!\nTente novamente mais tarde!');
      } finally {
        setLoading(false);
      }
    }

    if (plan_id) getPlan();
  }, [plan_id]);

  async function handleSubmit(data) {
    try {
      if (plan.id) {
        const response = await api.put(`plans/${plan.id}`, data);
        toast.success('Plano atualizado com sucesso!');
        setPlan(response.data);
      } else {
        const response = await api.post('plans', data);
        toast.success('Plano salvo com sucesso!');
        setPlan(response.data);
      }
    } catch (error) {
      toast.error(
        'Houve um erro ao salvar! confira os dados e tente novamente!'
      );
    }
  }

  return (
    <Container>
      <Form schema={Schema} onSubmit={handleSubmit} initialData={plan}>
        <TitleActions>
          <Title>{plan ? 'Edição de plano' : 'Cadastro de plano'}</Title>

          <Actions>
            <Link className="cancel" to="/planos">
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
              <strong>TÍTULO DO PLANO</strong>
              <Input name="title" />
            </div>

            <OneLine>
              <div>
                <strong>DURAÇÃO (em meses)</strong>
                <Input name="duration" />
              </div>
              <div>
                <strong>PREÇO MENSAL</strong>
                <Input name="price" />
              </div>
              <div />
            </OneLine>
          </FormContainer>
        )}
      </Form>
    </Container>
  );
}
