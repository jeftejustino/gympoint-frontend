import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';

import { TitleActions, Title, Actions, Search } from '~/styles/titleActions';
import { List } from '~/styles/list';
import { Container, LoadingContainer } from './styles';

import Loading from '~/components/Loading';

import api from '~/services/api';

import { edit } from '~/store/modules/student/actions';

export default function StudentsList() {
  const [students, setSutents] = useState([]);
  const [search, setSearch] = useState('a');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getStudents() {
      try {
        setLoading(true);
        const response = await api.get('/students', {
          params: {
            q: search,
            page,
          },
        });

        setSutents(response.data);
      } catch (error) {
        toast.error('Falhar ao buscar alunos!\nTente novamente mais tarde!');
      } finally {
        setLoading(false);
      }
    }

    if (page === 0) {
      setPage(1);
    } else {
      getStudents();
    }
  }, [search, page]);

  async function handleEditar(id) {}

  async function handleApagar(id) {
    try {
      // await api.delete(`/students/${id}`);

      setPage(0);
    } catch (error) {
      toast.error('Falhar ao remove aluno!\nTente novamente mais tarde!');
    }
  }

  return (
    <Container>
      <TitleActions>
        <Title>Gerenciando alunos</Title>

        <Actions>
          <Link to="/alunos/adicionar">
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </Link>

          <Search>
            <input
              placeholder="Buscar aluno"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
            <MdSearch color="#999" size={16} />
          </Search>
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
              <th>NOME</th>
              <th width="300px">E-MAIL</th>
              <th width="300px" className="text-center">
                IDADE
              </th>
              <th width="60px" />
              <th width="40px" />
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td align="center">{student.age}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleEditar(student.id)}
                  >
                    editar
                  </button>
                </td>
                <td>
                  <button
                    className="remove"
                    type="button"
                    onClick={() => handleApagar(student.id)}
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
