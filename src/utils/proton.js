import { ConnectWallet } from '@protonprotocol/proton-web-sdk'
import Foobar from '../coin.svg'

class ProtonSDK {
  constructor() {
    this.chainId = '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0';
    this.endpoints = ['https://proton.greymass.com']; // Multiple for fault tolerance
    this.appName = 'Foobar';
    this.requestAccount = 'foobar'; // optional
    this.session = null;
    this.link = null;
  }

  login = async () => {
    try {
      const { link, session } = await ConnectWallet({
        linkOptions: { chainId: this.chainId, endpoints: this.endpoints },
        transportOptions: { requestAccount: this.requestAccount, backButton: true },
        selectorOptions: { appName: this.appName,appLogo: Foobar}
      });
      this.link = link;
      this.session = session;
      localStorage.setItem('savedUserAuth-foobar', JSON.stringify(session.auth));
      return { auth: session.auth, accountData: session.accountData[0] };
    } catch (e) {
      return e;
    }
  }

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
  }

  logout = async () => {
    await this.link.removeSession(this.appName, this.session.auth);
    localStorage.removeItem('savedUserAuth-foobar');
  }

  restoreSession = async () => {
    const savedUserAuth = JSON.parse(localStorage.getItem('savedUserAuth-foobar'));
    if (savedUserAuth) {
      try {
        const { link, session } = await ConnectWallet({
          linkOptions: { chainId: this.chainId, endpoints: this.endpoints, restoreSession: true},
          transportOptions: { requestAccount: this.requestAccount },
          selectorOptions: { appName: this.appName, appLogo: Foobar, showSelector: false}
        });
        this.link = link;
        this.session = session;
        
        if (session) {
          return { auth: this.session.auth, accountData: this.session.accountData[0] };
        }
      } catch(e) {
        return e;
      }
    }
    return { auth: { actor: '', permission: '' }, accountData: {}};
  }
}

const protonSDK = new ProtonSDK();
export default protonSDK;