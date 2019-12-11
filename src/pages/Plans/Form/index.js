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

export default function PlansForm({ history }) {
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
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [fullPrice, setFullPrice] = useState(0);
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
        setPrice(data[0].price);
        setDuration(data[0].duration);
        setPlan(data[0]);
      } catch (error) {
        toast.error('Falhar ao buscar alunos!\nTente novamente mais tarde!');
      } finally {
        setLoading(false);
      }
    }

    if (plan_id) getPlan();
  }, [plan_id]);

  useEffect(() => {
    let fprice = '';
    if (price && duration) {
      fprice = price * duration;
    }
    setFullPrice(fprice);
  }, [price, duration]);

  async function handleSubmit(data) {
    try {
      if (plan.id) {
        await api.put(`plans/${plan.id}`, data);
        toast.success('Plano atualizado com sucesso!');
      } else {
        await api.post('plans', data);
        toast.success('Plano salvo com sucesso!');
      }
      history.push('/planos');
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
                <Input
                  name="duration"
                  value={duration}
                  onChange={e => {
                    setDuration(e.target.value);
                  }}
                />
              </div>
              <div>
                <strong>PREÇO MENSAL</strong>
                <Input
                  name="price"
                  value={price}
                  onChange={e => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <strong>PREÇO TOTAL</strong>
                <Input name="precoTotal" value={fullPrice} disabled />
              </div>
            </OneLine>
          </FormContainer>
        )}
      </Form>
    </Container>
  );
}
