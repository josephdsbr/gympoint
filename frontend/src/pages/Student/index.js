import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Container,
  Header,
  Title,
  Search,
  RegisterButton,
  Input,
  Content,
  Table,
} from './styles';
import api from '../../services/api';
import history from '../../services/history';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');
      setStudents(response.data);
      console.log(response.data);
      setStudentList(response.data);
    }

    loadStudents();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`students/${id}`);
      toast.success('Estudante deletado com sucesso');
      window.location.reload();
    } catch (e) {
      toast.error('Erro ao deletar estudante');
    }
  }

  function onHandleFilter(str) {
    if (str.length > 0) {
      const newStudents = students.filter(student => {
        return student.name.includes(str);
      });

      setStudentList(newStudents);
    } else {
      setStudentList(students);
    }
  }

  function handleUpdate(id) {
    history.push('/student/update', { id });
  }

  return (
    <Container>
      <Header>
        <Title>Gerenciando Alunos</Title>
        <Search>
          <RegisterButton onClick={() => history.push('/student/register')}>
            Cadastrar
          </RegisterButton>
          <Input
            placeholder="Buscar aluno"
            onChange={e => onHandleFilter(e.target.value)}
          />
        </Search>
      </Header>
      <Content>
        <Table>
          <tbody>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Idade</th>
              <th />
            </tr>
            {studentList.map(student => (
              <tr key={student.id} className="table-row">
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    type="button"
                    className="edit"
                    onClick={() => handleUpdate(student.id)}
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => handleDelete(student.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
