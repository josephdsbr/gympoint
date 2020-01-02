import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withNavigationFocus} from 'react-navigation';
import {useSelector} from 'react-redux';
import {Container, AnswerList, AccessButton} from './styles';

import api from '~/services/api';
import AnswerItem from '~/components/AnswerItem';
import Background from '~/components/Background';

function List({navigation, isFocused}) {
  const [data, setData] = useState([]);
  const {id} = useSelector(state => state.user.profile);

  async function loadQuestion() {
    const response = await api.get(`/students/${id}/help-others`);
    setData(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadQuestion();
    }
  }, [isFocused]);

  function handlePass() {
    navigation.navigate('Answer', {id: data.student_id});
  }

  return (
    <Background>
      <Container>
        <AccessButton onPress={handlePass}>Novo pedido de auxílio</AccessButton>
        <AnswerList
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <AnswerItem data={item} navigation={navigation} />
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(List);

List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  isFocused: PropTypes.bool.isRequired,
};
