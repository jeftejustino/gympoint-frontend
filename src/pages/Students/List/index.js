import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';

import { TitleActions, Title, Actions, Search } from '~/styles/titleActions';
import { List } from '~/styles/list';
import { Container } from './styles';

export default function StudentsList() {
  function handleApagar() {}

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
            <input placeholder="Buscar aluno" />
            <MdSearch color="#999" size={16} />
          </Search>
        </Actions>
      </TitleActions>

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
          <tr>
            <td>Nome do aluno</td>
            <td>email@exemplo.com</td>
            <td align="center">20</td>
            <td>
              <Link to="alunos/editar/3">editar</Link>
            </td>
            <td>
              <button type="button" onClick={handleApagar}>
                apagar
              </button>
            </td>
          </tr>
          <tr>
            <td>Nome do aluno</td>
            <td>email@exemplo.com</td>
            <td className="text-center">20</td>
            <td>
              <Link to="alunos/editar/3">editar</Link>
            </td>
            <td>
              <button type="button" onClick={handleApagar}>
                apagar
              </button>
            </td>
          </tr>
          <tr>
            <td>Nome do aluno</td>
            <td>email@exemplo.com</td>
            <td align="center">20</td>
            <td>
              <Link to="alunos/editar/3">editar</Link>
            </td>
            <td>
              <button type="button" onClick={handleApagar}>
                apagar
              </button>
            </td>
          </tr>
        </tbody>
      </List>
    </Container>
  );
}
