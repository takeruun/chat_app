import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

/**
 * @function storeFactory
 * @param {object} initialState
 * @returns {Store} Redux Store
 */
export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};
