import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  background: #ffffff;
  flex-direction: row;
  padding: 18px;
  justify-content: center;
  border: 1px solid #dddddd;
`;

export const FowardButton = styled(Button)`
  display: flex;
  height: auto;
  align-self: flex-start;
`;

export const Title = styled.Text`
  margin-left: 5px;
  color: #ee4e62;
  font-size: 15px;
`;
