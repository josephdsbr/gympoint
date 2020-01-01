import React, {useEffect, useState, useMemo} from 'react';

import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Background from '~/components/Background';

import api from '~/services/api';
import {
  Container,
  Body,
  Question,
  QuestionHeader,
  QuestionTitle,
  QuestionTime,
  QuestionContent,
  Answer,
  AnswerHeader,
  AnswerTitle,
  AnswerContent,
} from './styles';

export default function Detail({navigation}) {
  const question = navigation.getParam('data');

  const questionDateFormatted = useMemo(() => {
    return formatRelative(parseISO(question.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [question.createdAt]);

  const [data, setData] = useState({});

  useEffect(() => {
    async function loadQuestionInfo() {
      const response = await api.get(`/help-others/${question.id}/info`);
      setData(response.data);
    }

    loadQuestionInfo();
  }, []);

  return (
    <Background>
      <Container>
        <Body>
          <Question>
            <QuestionHeader>
              <QuestionTitle>PERGUNTA</QuestionTitle>
              <QuestionTime>{questionDateFormatted}</QuestionTime>
            </QuestionHeader>
            <QuestionContent>{question.question}</QuestionContent>
          </Question>
          <Answer answered={data.answer !== null}>
            <AnswerHeader>
              <AnswerTitle>RESPOSTA</AnswerTitle>
            </AnswerHeader>
            <AnswerContent>{question.answer}</AnswerContent>
          </Answer>
        </Body>
      </Container>
    </Background>
  );
}
