import styled from 'styled-components/native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.View`
  padding: 4%;
`;

export const AnswerText = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
  textAlignVertical: 'top',
})`
  background: #FFFFFF;
  height: 80%;
  padding-left: 10px;
  margin-bottom: 10px;
`;

export const AnswerButton = styled(Button)``;
