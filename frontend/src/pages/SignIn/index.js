import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Logo from '../../assets/logo.svg';
import { signInRequest } from '../../store/modules/auth/actions';
import { Container, Form, Input, Content } from './styles';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor, informe um e-mail válido')
      .required('Esta informação é obrigatória'),
    password: Yup.string().min(
      6,
      'Sua senha deve ter, no mínimo, seis digitos'
    ),
  });

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  async function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <Container>
      <Content>
        <img src={Logo} alt="logo" />
        <Form schema={schema} onSubmit={handleSubmit}>
          <label>SEU E-MAIL</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <label>SUA SENHA</label>
          <Input name="password" type="password" placeholder="*************" />
          <button type="submit">{loading ? 'Carregando ...' : 'Entrar no Sistema'}</button>
        </Form>
      </Content>
    </Container>
  );
}
