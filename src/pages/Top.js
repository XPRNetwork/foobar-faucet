import React, { useState, useEffect, useRef } from 'react';
import Login from '../components/Login';
import SignedIn from '../components/SignedIn';
import ProtonSDK from '../utils/proton';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Top = () => {
  const [error, setError] = useState('');
  const [auth, setAuth] = useState('');
  const [permission, setPermission] = useState('');
  const [accountData, setAccountData] = useState({});

  const prevError = usePrevious(error);
  useEffect(() => {
    if(prevError) {
      setError('');
    }
  }, [prevError]);

  useEffect(() => {
    async function checkIfLoggedIn() {
      const { auth, accountData, error } = await ProtonSDK.restoreSession();
      if (error) {
        setError(error);
        return;
      }
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

  const generateLoginRequest = async () => {
    const { auth, accountData, error } = await ProtonSDK.login();

    if (error) {
      setError(error);
      return;
    }

    setAuth(auth.actor);
    setPermission(auth.permission);
    setAccountData(accountData);
  };

  const logout = async () => {
    await ProtonSDK.logout();
    setAuth('');
    setPermission('');
    setAccountData({});
  };

  if (auth && permission && accountData) {
    return <SignedIn accountData={accountData} logout={logout} />;
  } else {
    return <Login login={generateLoginRequest} error={error} />;
  }
};

export default Top;
