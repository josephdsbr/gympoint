import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Menu, UserInfo, MenuContainer, MenuItem } from './styles';
import Logo from '../../assets/signed-logo.svg';
import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth.user);
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Menu>
        <img src={Logo} alt="logo" />
        <MenuContainer>
          <MenuItem className="selected" to="/student">
            ALUNOS
          </MenuItem>
          <MenuItem to="/plan">PLANOS</MenuItem>
          <MenuItem to="/enrollment">MATRÍCULAS</MenuItem>
          <MenuItem to="/help-other">PEDIDOS DE AUXÍLIO</MenuItem>
        </MenuContainer>
      </Menu>
      <UserInfo>
        <p>{name}</p>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <span onClick={handleSignOut}>sair do sistema</span>
      </UserInfo>
    </Container>
  );
}
