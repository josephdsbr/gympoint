import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
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

export default function StudentUpdate({ location }) {
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

  const [student, setStudent] = useState({});

  async function onHandleSubmit({ name, email, age, weight, height }) {
    try {
      await api.put('students', {
        id: student.id,
        name,
        email,
        age,
        weight,
        height,
      });
      toast.success('Alteração feita com sucesso');
      history.push('/student');
    } catch (e) {
      toast.error('Não foi possível realizar a alteração');
    }
  }

  useEffect(() => {
    async function loadStudent() {
      const { id } = location.state;
      const response = await api.get(`students/${id}`);
      setStudent(response.data);
    }
    loadStudent();
  }, [location.state]);

  return (
    <Container>
      <Header>
        <Title>Edição de Aluno</Title>
        <Search>
          <BackButton type="button" onClick={() => history.goBack()}>
            Voltar
          </BackButton>
          <RegisterButton type="submit" form="register">
            Atualizar
          </RegisterButton>
        </Search>
      </Header>
      <Content>
        <Form
          initialData={student}
          schema={schema}
          onSubmit={onHandleSubmit}
          id="register"
        >
          <FormItem>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Nome Completo</label>
            <Input name="name" placeholder="José Vinícius" />
          </FormItem>
          <FormItem>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Endereço de e-mail</label>
            <Input name="email" placeholder="josephdsbr@gmail.com" />
          </FormItem>
          <div className="container">
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Idade</label>
              <Input name="age" />
            </FormItem>
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>PESO (em kg)</label>
              <Input name="weight" />
            </FormItem>
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Altura</label>
              <Input name="height" />
            </FormItem>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

StudentUpdate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};
