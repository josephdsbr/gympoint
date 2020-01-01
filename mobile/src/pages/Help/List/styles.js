import styled from 'styled-components/native';
import Button from '~/components/Button';

export const AccessButton = styled(Button)`
  width: 100%;
  margin-bottom: 15px;
`;

export const AnswerList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-bottom: 20px;
`;

export const Container = styled.View`
  padding: 20px;
`;
