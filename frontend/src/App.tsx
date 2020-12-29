import React from 'react';

import SignIn from './pages/SigIn/index';
// import SignUp from './pages/SigUp/index';
import GlobalStyle from './styles/global';

import { AuthProvider } from './content/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
