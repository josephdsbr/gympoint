import styled from 'styled-components';
import { darken } from 'polished';
import { Form as RocketForm, Input as RocketInput } from '@rocketseat/unform';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Content = styled.div`
  background: #ffffff;
  width: 25%;
  padding: 30px;
  min-height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #dddddd;
  border-radius: 4px;
  img {
    margin-bottom: 20px;
  }
`;

export const Form = styled(RocketForm)`
  width: 100%;
  display: flex;
  flex-direction: column;
  label {
    text-transform: uppercase;
    color: #444444;
  }
  button {
    margin-top: 10px;
    background: #ee4d64;
    color: #fff;
    font-weight: 700;
    font-size: 1.1rem;
    height: 2.5rem;
    transition: background 0.2s;
    border: none;
    border-radius: 4px;
    &:hover {
      background: ${darken(0.05, '#ee4d64')};
    }
  }
`;

export const Input = styled(RocketInput)`
  padding: 10px 10px;
  margin: 10px 0;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #444444;
`;
