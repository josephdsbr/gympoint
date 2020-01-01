import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 4%;
`;

export const Body = styled.View`
  background: #fff;
  padding: 4%;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

export const Question = styled.View`
  padding: 10px 0;
`;

export const QuestionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const QuestionTitle = styled.Text`
  color: #444444;
`;

export const QuestionTime = styled.Text`
  color: #666666;
`;

export const QuestionContent = styled.Text`
  color: #666666;
`;

export const Answer = styled.View`
  display: ${props => (props.answered === true ? 'flex' : 'none')};
`;

export const AnswerHeader = styled.View``;

export const AnswerTitle = styled.Text`
  color: #444444;
`;

export const AnswerContent = styled.Text`
  color: #666666;
`;
