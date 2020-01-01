import styled from 'styled-components/native';
import { TouchableOpacity } from "react-native";

export const AnswerBody = styled(TouchableOpacity)`
  background: #fff;
  padding: 10px 15px;
  margin: 10px 0;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  height: auto;
`;

export const AnswerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const AnswerStatus = styled.Text`
  color: ${props => props.answered ? '#42CB59' : '#999999'};
`;

export const AnswerTime = styled.Text`
  color: #666666;
`;

export const AnswerContent = styled.Text`
  color: #666666;
`;
