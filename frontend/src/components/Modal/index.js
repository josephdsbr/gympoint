import React from 'react';
import * as Yup from 'yup';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Container,
  Form,
  Question,
  Title,
  Body,
  Answer,
  Input,
  Button,
  Close,
} from './styles';
import api from '../../services/api';

const schema = Yup.object().shape({
  answer: Yup.string()
    .min(10, () => {
      toast.error('Mínimo de dez caracteres');
    })
    .required(() => {
      toast.error('A mensagem é obrigatória');
    }),
});

export default function Modal({ display, onClose, question }) {
  async function onHandleSubmit({ answer }) {
    try {
      await api.post(`help-others/${question.id}/anwser`, {
        answer,
      });

      toast.success('Resposta enviada com sucesso');
      onClose();
      window.location.reload();
    } catch (e) {
      toast.error('Erro ao enviar resposta');
    }
  }
  return (
    <Container display={display}>
      <Form schema={schema} onSubmit={onHandleSubmit}>
        <Close>
          <MdClose color="#000" size={20} onClick={onClose} />
        </Close>
        <Question>
          <Title>PERGUNTA DO ALUNO</Title>
          <Body>{question.question}</Body>
        </Question>
        <Answer>
          <Title>SUA RESPOSTA</Title>
          <Input name="answer" multiline placeholder="examplo@email.com" />
        </Answer>
        <Button type="submit">Responder aluno</Button>
      </Form>
    </Container>
  );
}

Modal.propTypes = {
  display: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
};
