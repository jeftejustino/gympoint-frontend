import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { TitleActions, Title, Actions } from '~/styles/titleActions';
import { List } from '~/styles/list';
import { Container, LoadingContainer } from './styles';

import Loading from '~/components/Loading';
import ModalConfirm from '~/components/ModalConfirm';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

import { editPlan } from '~/store/modules/plan/actions';

export default function PlansList() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [planConfirm, setPlanConfirm] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlans() {
      try {
        setLoading(true);
        const response = await api.get('/plans', {
          params: {
            page,
          },
        });

        const data = response.data.map(plan => ({
          ...plan,
          durationFormated: `${plan.duration} ${
            plan.duration === 1 ? `mês` : `meses`
          }`,
          priceFormated: formatPrice(plan.price),
        }));

        setPlans(data);
      } catch (error) {
        toast.error('Falhar ao buscar alunos!\nTente novamente mais tarde!');
      } finally {
        setLoading(false);
      }
    }

    if (page === 0) {
      setPage(1);
    } else {
      getPlans();
    }
  }, [page]);

  async function handleEdit(planData) {
    dispatch(editPlan(planData));
  }

  async function handleConfirm(id) {
    setPlanConfirm(id);
    setConfirm(true);
  }

  async function handleCancel() {
    setPlanConfirm(null);
    setConfirm(false);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/plans/${id}`);

      setPage(0);
      toast.success('Sucesso ao remover plano!');
    } catch (error) {
      toast.error('Falhar ao remover plano!\nTente novamente mais tarde!');
    } finally {
      setPlanConfirm(null);
      setConfirm(false);
    }
  }

  return (
    <Container>
      <ModalConfirm
        show={confirm}
        handleCancel={() => handleCancel()}
        handleConfirm={() => handleDelete(planConfirm)}
      >
        <div>Realmente deseja remover o plano?</div>
      </ModalConfirm>

      <TitleActions>
        <Title>Gerenciando planos</Title>

        <Actions>
          <Link to="/planos/adicionar">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </Link>
        </Actions>
      </TitleActions>
      {loading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <List>
          <thead>
            <tr>
              <th>TITULO</th>
              <th width="300px" className="text-center">
                DURAÇÃO
              </th>
              <th width="300px" className="text-center">
                VALOR p/Mês
              </th>
              <th width="60px" />
              <th width="40px" />
            </tr>
          </thead>

          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td align="center">{plan.durationFormated}</td>
                <td align="center">{plan.priceFormated}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleEdit(plan)}
                  >
                    editar
                  </button>
                </td>
                <td>
                  <button
                    className="remove"
                    type="button"
                    onClick={() => handleConfirm(plan.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </List>
      )}
    </Container>
  );
}
