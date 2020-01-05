import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Header,
  ContentBody,
  ContentHeader,
  HeaderTitle,
  Body,
  Item,
  Name,
  Title,
} from './styles';
import api from '../../services/api';
import Modal from '../../components/Modal';

export default function HelpOther() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('help-others-not-answer');
      setQuestions(response.data);
    }

    loadPlans();
  }, []);

  function onHandleOpen() {
    setDisplay(true);
  }

  function onHandleClose() {
    setDisplay(false);
  }

  function onHandleSelectedQuestion(question) {
    setSelectedQuestion(question);
    onHandleOpen();
  }

  return (
    <>
      {display && (
        <Modal
          display={display}
          onClose={onHandleClose}
          question={selectedQuestion}
        />
      )}
      <Container>
        <Header>
          <Title>Pedidos de auxílio </Title>
        </Header>
        <Content>
          <ContentBody>
            <ContentHeader>
              <HeaderTitle>ALUNO</HeaderTitle>
            </ContentHeader>
            <Body>
              {questions.map(question => (
                <Item key={question.id}>
                  <Name>{question.student.name}</Name>
                  <button
                    type="button"
                    onClick={() => onHandleSelectedQuestion(question)}
                    className="edit"
                  >
                    responder
                  </button>
                </Item>
              ))}
            </Body>
          </ContentBody>
        </Content>
      </Container>
    </>
  );
}
