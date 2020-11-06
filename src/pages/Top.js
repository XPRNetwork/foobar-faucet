import React from 'react';
import Login from '../components/Login';
import SignedIn from '../components/SignedIn';
import { useAuthContext } from '../utils/providers/AuthProvider';

const Top = () => {
  const {
    auth,
    permission,
    accountData,
    logout,
    generateLoginRequest,
  } = useAuthContext();

  if (auth && permission && accountData) {
    return <SignedIn accountData={accountData} logout={logout} />;
  } else {
    return <Login login={generateLoginRequest} />;
  }
};

export default Top;
