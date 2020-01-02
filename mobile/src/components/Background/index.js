import React from 'react';
import PropTypes from 'prop-types';
import {Container} from './styles';

import Header from '~/components/Header';

export default function Background({children}) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

Background.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
