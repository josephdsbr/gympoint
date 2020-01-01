import React from 'react';
import {Container} from './styles';
import { TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';

export default function Background({children}) {
  return (
    <Container>
      
      <Header />
      {children}
    </Container>
  );
}
