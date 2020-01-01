import React, {useState} from 'react';
import {Alert} from 'react-native';
import Background from '~/components/Background';
import {Container, AnswerText, AnswerButton} from './styles';
import api from '~/services/api';

export default function Answer({navigation}) {
  const [question, setQuestion] = useState('');
  const id = 1;
  async function handleSendMessage() {
    try {
      await api.post(`/students/${id}/help-others`, {
        question,
      });
      navigation.navigate('List');
    } catch (e) {
      Alert.alert(
        'Falha',
        'Sua mensagem não foi enviada, por favor, verifique se não excedeu o limite de caracteres.'
      );
    }
  }
  return (
    <Background>
      <Container>
        <AnswerText
          multiline
          autoCorret
          placeholder="Digite sua pergunta"
          maxLength={255}
          value={question}
          onChangeText={setQuestion}
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
        />
        <AnswerButton onPress={handleSendMessage}>Enviar pedido</AnswerButton>
      </Container>
    </Background>
  );
}
