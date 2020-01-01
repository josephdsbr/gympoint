import styled from 'styled-components';
import { Form as RocketForm, Input as RocketInput } from '@rocketseat/unform';

export const Container = styled.div`
  width: 60%;
  height: 80%;
  background: transparent;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 0 0 3%;
`;

export const Title = styled.p`
  color: #444444;
  font-size: 24px;
`;

export const Search = styled.div`
  display: flex;
`;

export const RegisterButton = styled.button`
  background: #ee4d64;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #ffffff;
  text-transform: uppercase;
  padding: 5px 10px;
`;

export const BackButton = styled(RegisterButton)`
  background: #707070;
  margin-right: 4px;
`;

export const Content = styled.div`
  background: #fff;
  min-height: 50%;
  border-radius: 4px;
  padding: 3%;
`;

export const Form = styled(RocketForm)`
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }
`;

export const Input = styled(RocketInput)`
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 10px 5px;

  &:disabled {
    background: #dddddd;
  }
`;

export const FormItem = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;

  label {
    text-transform: uppercase;
    color: #444444;
    margin-bottom: 10px;
  }
`;
