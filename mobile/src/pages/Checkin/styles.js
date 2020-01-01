import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  width: 92%;
  margin: 20px 0;
  align-self: center;
`;

export const CheckingButton = styled(Button)`
  width: 100%;
`;

export const CheckinContainer = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 0, margin: 0},
})`
  align-self: center;
  width: 100%;
`;
