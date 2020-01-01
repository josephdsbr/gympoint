import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  Container,
  Header,
  Title,
  Search,
  RegisterButton,
  Input,
  Content,
  Form,
  FormItem,
  BackButton,
} from './styles';

import api from '../../services/api';
import history from '../../services/history';

export default function StudentRegister() {
  const schema = Yup.object().shape({
    name: Yup.string().required(() => {
      toast.error('Nome é obrigatório');
    }),
    email: Yup.string()
      .email(() => {
        toast.error('E-mail tem que ser válido');
      })
      .required(() => {
        toast.error('E-mail é obrigatório');
      }),
    age: Yup.number()
      .typeError(() => {
        toast.error('Formado inválido para a idade');
      })
      .min(1, () => {
        toast.error('Idade não poder menor do que 1');
      })
      .required(() => {
        toast.error('Idade é obrigatória');
      }),
    weight: Yup.number()
      .typeError(() => {
        toast.error('Formado inválido para o peso');
      })
      .min(1, () => {
        toast.error('Peso não pode ser menor do que 1');
      })
      .required(() => {
        toast.error('Peso é obrigatório');
      }),
    height: Yup.number()
      .typeError(() => {
        toast.error('Formado inválido para a altura');
      })
      .min(0, () => {
        toast.error('Altura não poder ser menor do que 1');
      })
      .required(() => {
        toast.error('Altura é obrigatório');
      }),
  });

  async function onHandleSubmit({ name, email, age, weight, height }) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        weight,
        height,
      });
      toast.success('Registro feito com sucesso');
      history.push('/student');
    } catch (e) {
      toast.error('Não foi possível realizar o registro');
    }
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro Alunos</Title>
        <Search>
          <BackButton type="button" onClick={() => history.goBack()}>
            Voltar
          </BackButton>
          <RegisterButton type="submit" form="register">
            Cadastrar
          </RegisterButton>
        </Search>
      </Header>
      <Content>
        <Form schema={schema} onSubmit={onHandleSubmit} id="register">
          <FormItem>
            <label>Nome Completo</label>
            <Input name="name" placeholder="José Vinícius" />
          </FormItem>
          <FormItem>
            <label>Endereço de e-mail</label>
            <Input name="email" placeholder="josephdsbr@gmail.com" />
          </FormItem>
          <div className="container">
            <FormItem>
              <label>Idade</label>
              <Input name="age" />
            </FormItem>
            <FormItem>
              <label>PESO (em kg)</label>
              <Input name="weight" />
            </FormItem>
            <FormItem>
              <label>Altura</label>
              <Input name="height" />
            </FormItem>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
