import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { MdHighlightOff, MdCheckCircle } from 'react-icons/md';
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

import history from '../../services/history';
import api from '../../services/api';

export default function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('enrollments');
      setEnrollments(response.data);
    }

    loadPlans();
  }, []);

  function onHandleUpdate(id) {
    history.push('/enrollment/update', { id });
  }

  async function onHandleDelete(id) {
    try {
      await api.delete(`enrollments/${id}`);
      toast.success('Cadastro deletado com sucesso');
      window.location.reload();
    } catch (e) {
      toast.error('Erro ao deletar cadastro');
    }
  }

  return (
    <Container>
      <Header>
        <Title>Gerenciando Alunos</Title>
        <Search>
          <RegisterButton
            type="button"
            onClick={() => history.push('/enrollment/register')}
          >
            Cadastrar
          </RegisterButton>
        </Search>
      </Header>
      <Content>
        <Table>
          <tr>
            <th>Aluno</th>
            <th>Plano</th>
            <th>Início</th>
            <th>Término</th>
            <th>Ativa</th>
            <th />
          </tr>
          {enrollments.map(enrollment => (
            <tr id={enrollment.id} className="table-row">
              <td>
                {enrollment.student ? enrollment.student.name : 'Sem usuário'}
              </td>
              <td>{enrollment.plan ? enrollment.plan.title : 'Sem plano'}</td>
              <td>
                {format(
                  parseISO(enrollment.start_date),
                  "d 'de' MMMM 'de' yyyy",
                  { locale: pt }
                )}
              </td>
              <td>
                {format(
                  parseISO(enrollment.end_date),
                  "d 'de' MMMM 'de' yyyy",
                  { locale: pt }
                )}
              </td>
              <td>
                {enrollment.active ? (
                  <MdCheckCircle size={15} color="green" />
                ) : (
                  <MdHighlightOff size={15} color="red" />
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="edit"
                  onClick={() => onHandleUpdate(enrollment.id)}
                >
                  editar
                </button>
                <button
                  type="button"
                  className="delete"
                  onClick={() => onHandleDelete(enrollment.id)}
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
