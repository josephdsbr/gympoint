import {all, takeLatest, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';
import api from '~/services/api';
import {updateProfileSuccess, updateProfileFail} from './actions';

export function* updateProfile({payload}) {
  try {
    const {name, email, ...rest} = payload.data;

    // eslint-disable-next-line prefer-object-spread
    const profile = Object.assign({name, email}, rest.oldPassword ? rest : {});

    const response = yield call(api.put, 'users', profile);
    Alert.alert('Successfully', 'Perfil updated');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Error to update profile', 'Please, check you informations.');
    updateProfileFail();
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
