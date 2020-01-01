import React from 'react';
import {Image} from 'react-native';
import Logo from '~/assets/logo-row.png';
import {Container, Title} from './styles';

export default function Header() {
  return (
    <Container>
      <Image source={Logo} />
      <Title>GYMPOINT</Title>
    </Container>
  );
}
