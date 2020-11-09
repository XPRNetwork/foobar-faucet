import { ConnectWallet } from '@protonprotocol/proton-web-sdk';
import Foobar from '../coin.svg';

class ProtonSDK {
  constructor() {
    this.chainId =
      '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0';
    this.endpoints = ['https://proton.greymass.com']; // Multiple for fault tolerance
    this.appName = 'Foobar';
    this.requestAccount = 'foobar'; // optional
    this.session = null;
    this.link = null;
  }

  connect = async (restoreSession = false, showSelector = true) => {
    const { link, session } = await ConnectWallet({
      linkOptions: {
        chainId: this.chainId,
        endpoints: this.endpoints,
        restoreSession,
      },
      transportOptions: {
        requestAccount: this.requestAccount,
        backButton: true,
      },
      selectorOptions: { appName: this.appName, appLogo: Foobar, showSelector },
    });
    this.link = link;
    this.session = session;
  };

  login = async () => {
    try {
      await this.connect();
      const { auth, accountData } = this.session;
      localStorage.setItem('savedUserAuth-foobar', JSON.stringify(auth));
      return { auth, accountData: accountData[0] };
    } catch (e) {
      return e;
    }
  };

  sendTransaction = async (actions) => {
    try {
      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );
      return result;
    } catch (e) {
      return e;
    }
  };

  logout = async () => {
    await this.link.removeSession(this.appName, this.session.auth);
    localStorage.removeItem('savedUserAuth-foobar');
  };

  restoreSession = async () => {
    const savedUserAuth = JSON.parse(
      localStorage.getItem('savedUserAuth-foobar')
    );
    if (savedUserAuth) {
      try {
        await this.connect(true, false);
        if (this.session) {
          const { auth, accountData } = this.session;
          return {
            auth,
            accountData: accountData[0],
          };
        }
      } catch (e) {
        return e;
      }
    }
    return { auth: { actor: '', permission: '' }, accountData: {} };
  };
}

const protonSDK = new ProtonSDK();
export default protonSDK;
