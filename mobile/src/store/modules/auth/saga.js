import {takeLatest, call, put, all} from 'redux-saga/effects';
import {Alert} from 'react-native';
import api from '~/services/api';

import {signInSuccess, signFailure, signOut} from './actions';

export function* signIn({payload}) {
  try {
    const {id} = payload;

    const response = yield call(api.get, `students/${id}`);

    const user = response.data;

    yield put(signInSuccess(user));
  } catch (err) {
    yield put(signFailure());
    Alert.alert('Fail in authentication', 'Please, check your informations.');
  }
}

export function setToken({payload}) {
  if (!payload) return;

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
