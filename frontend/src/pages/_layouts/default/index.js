import React from 'react';

import { Container, Wrapper } from './styles';
import Header from '../../../components/Header';

export default function DefaultLayout({ children }) {
  return (
    <Container>
      <Header />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}
