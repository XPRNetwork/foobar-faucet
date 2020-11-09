import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useMemo,
  } from 'react';
  import ProtonSDK from '../proton';
  
  const authContext = createContext({
    actor: '',
    permssion: '',
    accountData: {},
    generateLoginRequest: () => {},
    logout: () => {},
  });
  
  export const useAuthContext = () => {
    const {
      actor,
      permssion,
      accountData,
      generateLoginRequest,
      logout,
    } = useContext(authContext);
  
    return {
      actor,
      permssion,
      accountData,
      generateLoginRequest,
      logout,
    };
  };
  
  const AuthProvider = ({ children }) => {
    const [actor, setActor] = useState('');
    const [permission, setPermission] = useState('');
    const [accountData, setAccountData] = useState({});
  
    const generateLoginRequest = async () => {
      try {
        const { auth, accountData } = await ProtonSDK.login();
        if (auth) {
          setUser(auth.actor, auth.permission, accountData);
        }
      } catch (e) {
        console.error(e);
      }
    };
  
    useEffect(() => {
      async function fetchData() {
        const { auth, accountData } = await ProtonSDK.restoreSession();
        if (auth && auth.actor && auth.permission) {
          setUser(auth.actor, auth.permission, accountData);
        }
      }
  
      fetchData();
      document.addEventListener('backToSelector', () => {
        generateLoginRequest();
      });
    });
  
    const setUser = (actor, permission, data) => {
      setActor(actor);
      setPermission(permission);
      setAccountData(data);
    };
  
    const logout = async () => {
      await ProtonSDK.logout();
      setUser('', '', {});
    };
  
    const authState = useMemo(
      () => ({
        actor,
        permission,
        accountData,
        generateLoginRequest,
        logout,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [accountData, actor, permission]
    );
  
    return (
      <authContext.Provider value={authState}>{children}</authContext.Provider>
    );
  };
  
  export default AuthProvider;
  