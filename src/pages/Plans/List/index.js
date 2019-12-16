/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { TitleActions, Title, Actions } from '~/styles/titleActions';
import { List } from '~/styles/list';
import { Container, LoadingContainer } from './styles';

import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import ModalConfirm from '~/components/ModalConfirm';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

export default function PlansList() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [planConfirm, setPlanConfirm] = useState({});

  const getPlans = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/plans', {
        params: {
          page,
        },
      });

      setTotalPages(parseInt(response.headers.count / 20, 10));

      const data = response.data.map(plan => ({
        ...plan,
        durationFormated: `${plan.duration} ${
          plan.duration === 1 ? `mês` : `meses`
        }`,
        priceFormated: formatPrice(plan.price),
      }));

      setPlans(data);
    } catch (error) {
      toast.error('Falha ao buscar alunos!\nTente novamente mais tarde!');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    console.tron.log('Reload');
    getPlans();
  }, [getPlans, page]);

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
      getPlans();

      toast.success('Sucesso ao remover plano!');
    } catch (error) {
      toast.error('Falha ao remover plano!\nTente novamente mais tarde!');
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
        <>
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
                    <Link className="edit" to={`/planos/editar/${plan.id}`}>
                      editar
                    </Link>
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
          <Pagination
            setPage={setPage}
            currentPage={page}
            totalPages={totalPages}
          />
        </>
      )}
    </Container>
  );
}
