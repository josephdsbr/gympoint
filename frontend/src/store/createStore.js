import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
