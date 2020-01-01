import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Background from '~/components/Background';
import logo from '~/assets/logo.png';
import {Container, Form, FormInput, SubmitButton} from './styles';

import {signInRequest} from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="favorite"
            keyboardType="numeric"
            placeholder="Digite seu ID"
            value={id}
            onChangeText={setId}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
