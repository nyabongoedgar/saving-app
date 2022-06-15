import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../redux/reducers';

const middleware = [thunk];

function render(
  component,
  {
    initialState,
    store = () => createStore(rootReducer, initialState, applyMiddleware(...middleware)),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store()}>{children}</Provider>;
  }
  return rtlRender(component, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };
