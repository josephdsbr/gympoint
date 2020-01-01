import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  return persistReducer(
    {
      key: 'gympoint',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );
};
