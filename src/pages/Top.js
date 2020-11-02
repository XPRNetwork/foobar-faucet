import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import SignedIn from '../components/SignedIn';
import ProtonSDK from '../utils/proton';

const Top = () => {
  const [auth, setAuth] = useState('');
  const [permission, setPermission] = useState('');
  const [accountData, setAccountData] = useState({});

  /* istanbul ignore next */
  useEffect(() => {
    async function checkIfLoggedIn() {
      const { auth, accountData } = await ProtonSDK.restoreSession();
      if (auth.actor && auth.permission) {
        setAuth(auth.actor);
        setPermission(auth.permission);
        setAccountData(accountData);
      }
    }

    checkIfLoggedIn();
    document.addEventListener('backToSelector', () => {
      generateLoginRequest();
    });
  }, []);

  /* istanbul ignore next */
  const generateLoginRequest = async () => {
    try {
      const { auth, accountData } = await ProtonSDK.login();
      setAuth(auth.actor);
      setPermission(auth.permission);
      setAccountData(accountData);
    } catch (e) {
      console.error(e);
    }
  }

  /* istanbul ignore next */
  const logout = async () => {
    await ProtonSDK.logout();
    setAuth('');
    setPermission('');
    setAccountData({}); 
  }

  if (auth && permission && accountData) {
    return <SignedIn accountData={accountData} logout={logout} />;
  } else {
    return <Login login={generateLoginRequest} />;
  }
};

export default Top;
