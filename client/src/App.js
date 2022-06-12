import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import IndexRoutes from './components/routes/IndexRoutes';
import "./sass/app.scss";

function App() {
  return (
    <Provider store={store}>  
        <IndexRoutes />
    </Provider>
  );
}

export default App;
