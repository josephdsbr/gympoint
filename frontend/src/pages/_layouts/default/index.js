import React from 'react';
import PropTypes from 'prop-types';

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

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};
