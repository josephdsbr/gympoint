import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import {Container, CheckingButton, CheckinContainer} from './styles';

import CheckinItem from '~/components/CheckinItem';

import api from '~/services/api';

// eslint-disable-next-line no-unused-vars
export default function Checkin({navigation}) {
  const {id} = useSelector(state => state.user.profile);
  const [checking, setChecking] = useState([]);

  useEffect(() => {
    async function loadChecking() {
      const response = await api.get(`/students/${id}/checkins`);
      setChecking(response.data);
    }

    loadChecking();
  }, []);

  async function handleCheckIn() {
    try {
      await api.post(`/students/${id}/checkins`);
      Alert.alert('Succeso', 'Checkin feito com sucesso');
      // eslint-disable-next-line react/prop-types
    } catch (err) {
      Alert.alert('Falha', 'Não conseguimos efetuar seu checking');
    }
  }

  return (
    <Background>
      <Container>
        <CheckingButton onPress={handleCheckIn}>Novo check-in</CheckingButton>
        <CheckinContainer
          data={checking}
          keyExtractor={item => String(item)}
          renderItem={({item}) => <CheckinItem id={item.id} data={item} />}
        />
      </Container>
    </Background>
  );
}
Checkin.navigationOptions = {
  tabBarLabel: 'Check-in',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

Checkin.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
};
