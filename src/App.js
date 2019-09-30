import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

import Background from './components/Background';

const App = () => {
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);

  return (
    <Background>
      <Routes />
    </Background>
  );
};

export default App;
