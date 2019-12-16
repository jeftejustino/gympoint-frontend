/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { TitleActions, Title, Actions } from '~/styles/titleActions';
import { List } from '~/styles/list';
import { Container, LoadingContainer, CheckCircle } from './styles';

import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import ModalConfirm from '~/components/ModalConfirm';

import api from '~/services/api';

export default function RegistrationsList() {
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [registrationConfirm, setRegistrationConfirm] = useState({});

  const getRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/registrations', {
        params: {
          page,
        },
      });

      setTotalPages(parseInt(response.headers.count / 20, 10));

      const data = response.data.map(registration => ({
        ...registration,
        start_dateFormatted: format(
          parseISO(registration.start_date),
          "dd 'de' MMMM 'de' yyyy ",
          {
            locale: pt,
          }
        ),
        end_dateFormatted: format(
          parseISO(registration.end_date),
          "dd 'de' MMMM 'de' yyyy ",
          {
            locale: pt,
          }
        ),
      }));

      console.tron.log(data);
      setRegistrations(data);
    } catch (error) {
      toast.error('Falha ao buscar matrículas!\nTente novamente mais tarde!');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getRegistrations();
  }, [getRegistrations]);

  async function handleConfirm(id) {
    setRegistrationConfirm(id);
    setConfirm(true);
  }

  async function handleCancel() {
    setRegistrationConfirm(null);
    setConfirm(false);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/registrations/${id}`);

      getRegistrations();
      toast.success('Sucesso ao remover matrícula!');
    } catch (error) {
      toast.error('Falha ao remover matrícula!\nTente novamente mais tarde!');
    } finally {
      setRegistrationConfirm(null);
      setConfirm(false);
    }
  }

  return (
    <Container>
      <ModalConfirm
        show={confirm}
        handleCancel={() => handleCancel()}
        handleConfirm={() => handleDelete(registrationConfirm)}
      >
        <div>Realmente deseja remover a matrícula?</div>
      </ModalConfirm>

      <TitleActions>
        <Title>Gerenciando matrículas</Title>

        <Actions>
          <Link to="matriculas/adicionar">
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
                <th>ALUNO</th>
                <th className="text-center">PLANO</th>
                <th className="text-center">INÍCIO</th>
                <th className="text-center">TÉRMINO</th>
                <th className="text-center">ATIVA</th>
                <th width="60px" />
                <th width="40px" />
              </tr>
            </thead>

            <tbody>
              {registrations.map(registration => (
                <tr key={registration.id}>
                  <td>{registration.student.name}</td>
                  <td align="center">{registration.plan.title}</td>
                  <td align="center">{registration.start_dateFormatted}</td>
                  <td align="center">{registration.end_dateFormatted}</td>
                  <td align="center">
                    <CheckCircle active={registration.active}>
                      <MdDone size={18} color="#fff" />
                    </CheckCircle>
                  </td>
                  <td>
                    <Link
                      to={`matriculas/editar/${registration.id}`}
                      className="edit"
                    >
                      editar
                    </Link>
                  </td>
                  <td>
                    <button
                      className="remove"
                      type="button"
                      onClick={() => handleConfirm(registration.id)}
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
