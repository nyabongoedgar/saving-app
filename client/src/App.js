import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import IndexRoutes from './components/routes/IndexRoutes';
import "./sass/app.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <IndexRoutes />
      </Router>
    </Provider>
  );
}

export default App;
