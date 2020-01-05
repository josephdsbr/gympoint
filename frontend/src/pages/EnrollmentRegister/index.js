import React, { useEffect, useState, useMemo } from 'react';
import { addMonths, format } from 'date-fns';
import { toast } from 'react-toastify';
import {
  Container,
  Header,
  Title,
  Search,
  RegisterButton,
  Input,
  Select,
  Content,
  Form,
  FormItem,
  BackButton,
} from './styles';
import DatePicker from '../../components/DatePicker';
import history from '../../services/history';
import api from '../../services/api';

export default function EnrollmentRegister() {
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  const finalDate = useMemo(() => {
    const selectedPlan = plans.filter(plan => {
      return plan.id === parseInt(selectedPlanId, 10);
    });
    let duration = 0;
    if (selectedPlan.length !== 0) {
      duration = selectedPlan[0].duration;
    }
    return selectedPlanId !== undefined && startDate !== undefined
      ? format(addMonths(startDate, duration), 'dd/MM/yyyy  ')
      : null;
  }, [plans, selectedPlanId, startDate]);

  const finalValue = useMemo(() => {
    const selectedPlan = plans.filter(plan => {
      return plan.id === parseInt(selectedPlanId, 10);
    });
    let finalPrice = 0;

    if (selectedPlan.length !== 0) {
      finalPrice = selectedPlan[0].duration * selectedPlan[0].price;
    }

    return finalPrice;
  }, [plans, selectedPlanId]);

  // eslint-disable-next-line camelcase
  async function onHandleSubmit({ student, plan, start_date }) {
    try {
      await api.post('enrollments', {
        student_id: student,
        plan_id: plan,
        start_date: format(start_date, 'yyyy-MM-dd'),
      });
      toast.success('Registro efetuado com sucesso');
      history.push('/enrollment');
    } catch (e) {
      toast.error('Não foi possível realizar o registro');
    }
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro de matrícula</Title>
        <Search>
          <BackButton onClick={() => history.goBack()}>Voltar</BackButton>
          <RegisterButton form="register" type="submit">
            Cadastrar
          </RegisterButton>
        </Search>
      </Header>
      <Content>
        <Form id="register" onSubmit={onHandleSubmit}>
          <FormItem>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Aluno</label>
            <Select
              name="student"
              placeholder="Selecione o aluno"
              options={students.map(student => ({
                id: student.id,
                title: student.name,
              }))}
            />
          </FormItem>
          <div className="container">
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Plano</label>
              <Select
                name="plan"
                placeholder="Selecione o plano"
                options={plans.map(plan => ({
                  id: plan.id,
                  title: plan.title,
                }))}
                onChange={e => setSelectedPlanId(e.target.value)}
              />
            </FormItem>
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Data de Início</label>
              <DatePicker
                name="start_date"
                setLocalVariableDate={setStartDate}
                initialDate={format(new Date(), 'yyyy-MM-dd')}
              />
            </FormItem>
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Data de Término</label>
              <Input name="end_date" value={finalDate} disabled />
            </FormItem>
            <FormItem>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Preço Total</label>
              <Input name="total_price" value={finalValue} disabled />
            </FormItem>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
