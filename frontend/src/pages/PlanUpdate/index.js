import React, { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
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
import history from '../../services/history';
import api from '../../services/api';

export default function PlanUpdate({ location }) {
  const schema = Yup.object().shape({
    title: Yup.string().required(() => {
      toast.error('Título é obrigatório');
    }),
    duration: Yup.number()
      .typeError(() => {
        toast.error('Formado inválido para a duração');
      })
      .min(0)
      .required(() => {
        toast.error('Duração é obrigatório');
      }),
    price: Yup.number()
      .typeError(() => {
        toast.error('Formado inválido para o preço');
      })
      .min(1, () => {
        toast.error('Preço tem que ser maior que zero');
      })
      .required(() => {
        toast.error('Preço é obrigatório');
      }),
    total_price: Yup.number()
      .typeError(() => {
        toast.error('Formado inválido para o preço total');
      })
      .min(1, () => {
        toast.error('Preço Total tem que ser maior que zero');
      })
      .required(() => {
        toast.error('Preço total é obrigatório');
      }),
  });

  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [planId, setPlanId] = useState(0);

  const totalPrice = useMemo(() => {
    return duration * price;
  }, [duration, price]);

  // eslint-disable-next-line no-shadow
  async function onHandleSubmit({ title, duration, price }) {
    try {
      await api.put(`plans/${planId}`, {
        title,
        duration,
        price,
      });
      toast.success('Registro realizado com sucesso');
      history.push('/plan');
    } catch (e) {
      toast.error('Falha no registro');
    }
  }

  useEffect(() => {
    async function loadPlan() {
      const { id } = location.state;
      const response = await api.get(`plans/${id}`);
      // eslint-disable-next-line no-shadow
      const { title, duration, price } = response.data;
      setTitle(title);
      setDuration(duration);
      setPrice(price);
      setPlanId(id);
    }

    loadPlan();
  }, [location.state]);

  return (
    <Container>
      <Header>
        <Title>Cadastro de Planos</Title>
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
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Título do Plano</label>
            <Input
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </FormItem>
          <div className="container">
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Duração (em meses)</label>
              <Input
                name="duration"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </FormItem>
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Preço mensal</label>
              <Input
                name="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </FormItem>
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Preço Total</label>
              <Input name="total_price" value={totalPrice} disabled />
            </FormItem>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

PlanUpdate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};
