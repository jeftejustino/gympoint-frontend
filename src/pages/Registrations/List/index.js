import React, { useState, useEffect } from 'react';
import { MdAdd, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { TitleActions, Title, Actions } from '~/styles/titleActions';
import { List } from '~/styles/list';
import { Container, LoadingContainer, CheckCircle } from './styles';

import Loading from '~/components/Loading';
import ModalConfirm from '~/components/ModalConfirm';

import api from '~/services/api';

import {
  editRegistration,
  createRegistration,
} from '~/store/modules/registration/actions';

export default function RegistrationsList() {
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [registrationConfirm, setRegistrationConfirm] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    async function getRegistrations() {
      try {
        setLoading(true);
        const response = await api.get('/registrations', {
          params: {
            page,
          },
        });

        const data = response.data.map(registration => ({
          ...registration,
          start_dateFormatted: format(
            parseISO(registration.start_date),
            "dd 'de' MMMM 'de' yyyy ",
            {
              locale: pt,
            }
          ),
          end_dateLinkFormatted: format(
            parseISO(registration.end_date),
            "dd 'de' MMMM 'de' yyyy ",
            {
              locale: pt,
            }
          ),
        }));

        setRegistrations(data);
      } catch (error) {
        toast.error(
          'Falhar ao buscar matrículas!\nTente novamente mais tarde!'
        );
      } finally {
        setLoading(false);
      }
    }

    if (page === 0) {
      setPage(1);
    } else {
      getRegistrations();
    }
  }, [page]);

  async function handleEdit(registrationData) {
    dispatch(editRegistration(registrationData));
  }

  async function handleCreate() {
    dispatch(createRegistration());
  }

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

      setPage(0);
      toast.success('Sucesso ao remover matrícula!');
    } catch (error) {
      toast.error('Falhar ao remover matrícula!\nTente novamente mais tarde!');
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
          <button type="button" onClick={handleCreate}>
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </button>
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
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleEdit(registration)}
                  >
                    editar
                  </button>
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
      )}
    </Container>
  );
}
