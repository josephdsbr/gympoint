import styled from 'styled-components';
import { Form as RocketForm, Input as RocketInput } from '@rocketseat/unform';

export const Container = styled.div`
  display: ${props => (props.display ? 'flex' : 'none')};
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

export const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const Form = styled(RocketForm)`
  background: #FFFFFF;
  position: relative;
  border: 1px solid #DDDDDD
  border-radius: 4px;
  width: 25%;
  padding: 2%;
  min-height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Question = styled.div``;

export const Title = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  color: #444444;
  margin-bottom: 8px;
`;

export const Body = styled.div`
  color: #666666;
`;

export const Answer = styled.div`
  min-height: 50%;
  margin-top: 10px;
`;

export const Input = styled(RocketInput)`
  border: 1px solid #dddddd;
  border-radius: 4px;
  background: #ffffff;
  color: #666666;
  width: 100%;
  min-height: 150px;
  padding: 5px 6px;
  resize: none;
  &::placeholder {
    color: #999999;
  }
`;

export const Button = styled.button`
  border: none;
  border-radius: 4px;
  background: #ee4d64;
  color: #ffffff;
  padding: 10px 0px;
  margin-top: 10px;
`;
