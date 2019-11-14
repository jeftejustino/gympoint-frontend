import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Content, Logo, Profile, Logout } from './styles';

import logo from '~/assets/images/logo-horizontal.svg';

import { SingOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispacth = useDispatch();
  const { name } = useSelector(state => state.user.profile);

  function handleLogout() {
    dispacth(SingOut());
  }

  return (
    <Container>
      <Content>
        <div>
          <Link to="/alunos">
            <Logo>
              <img src={logo} alt="GymPoint" />
            </Logo>
          </Link>

          <nav>
            <NavLink to="/alunos">ALUNOS</NavLink>
            <NavLink to="/planos">PLANOS</NavLink>
            <NavLink to="/matriculas">MATRÍCULAS</NavLink>
            <NavLink to="/pedidos-de-auxilio">PEDIDOS DE AUXÍLIO</NavLink>
          </nav>
        </div>

        <aside>
          <Profile>{name}</Profile>
          <Logout onClick={handleLogout}>sair do sistema</Logout>
        </aside>
      </Content>
    </Container>
  );
}
