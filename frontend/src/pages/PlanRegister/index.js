import React, { useState, useMemo } from 'react';
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
import history from '../../services/history';
import api from '../../services/api';

export default function PlanRegister() {
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
  const [duration, setDuration] = useState(0);

  const totalPrice = useMemo(() => {
    return price * duration;
  }, [duration, price]);

  async function onHandleSubmit({ title, duration, price }) {
    try {
      await api.post('plans', {
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
            <label>Título do Plano</label>
            <Input name="title" />
          </FormItem>
          <div className="container">
            <FormItem>
              <label>Duração (em meses)</label>
              <Input
                name="duration"
                onChange={e => setDuration(e.target.value)}
              />
            </FormItem>
            <FormItem>
              <label>Preço mensal</label>
              <Input name="price" onChange={e => setPrice(e.target.value)} />
            </FormItem>
            <FormItem>
              <label>Preço Total</label>
              <Input name="total_price" value={totalPrice} disabled />
            </FormItem>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
