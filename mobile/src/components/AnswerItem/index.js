import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  AnswerBody,
  AnswerContent,
  AnswerHeader,
  AnswerStatus,
  AnswerTime,
} from './styles';

export default function AnswerItem({data, navigation}) {
  const dateFormated = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);
  
  function handlePass() {
    navigation.navigate('Detail', {data});
  }
  
  return (
    <AnswerBody onPress={handlePass}>
      <AnswerHeader>
        <AnswerStatus answered={data.answer !== null}>
          {data.answer !== null ? 'Respondido' : 'Sem resposta'}
        </AnswerStatus>
        <AnswerTime>{dateFormated}</AnswerTime>
      </AnswerHeader>
      <AnswerContent>{data.question}</AnswerContent>
    </AnswerBody>
  );
}
