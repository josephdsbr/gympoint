import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Header,
  Input,
  RegisterButton,
  Search,
  Table,
  Title,
} from './styles';
import api from '../../services/api';
import history from '../../services/history';

export default function Plan() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      setPlans(response.data);
    }

    loadPlans();
  }, []);

  function onHandleEdit(id) {
    history.push('/plan/update', { id });
  }
  return (
    <Container>
      <Header>
        <Title>Gerenciando Planos</Title>
        <Search>
          <RegisterButton
            type="button"
            onClick={() => history.push('/plan/register')}
          >
            Cadastrar
          </RegisterButton>
        </Search>
      </Header>
      <Content>
        <Table>
          <tr>
            <th>Plano</th>
            <th>Duração</th>
            <th>Valor (mensal)</th>
            <th />
          </tr>
          {plans.map(plan => (
            <tr id={plan.id} className="table-row">
              <td>{plan.title}</td>
              <td>{`${plan.duration} ${
                plan.duration === 1 ? 'mês' : 'meses'
              }`}</td>
              <td>
                {plan.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>
                <button
                  type="button"
                  className="edit"
                  onClick={() => onHandleEdit(plan.id)}
                >
                  editar
                </button>
                <button
                  type="button"
                  className="delete"
                  onClick={() => console.log('ola')}
                >
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </Content>
    </Container>
  );
}
