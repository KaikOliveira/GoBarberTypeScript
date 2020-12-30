import React from 'react';

import SignIn from './pages/SigIn/index';
// import SignUp from './pages/SigUp/index';
import GlobalStyle from './styles/global';

import AppProvider from './hooks/index';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
