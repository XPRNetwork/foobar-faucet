# Foobar Faucet
This demo shows the practical usage and integration of the [Proton Web Sdk](https://www.npmjs.com/package/@proton/web-sdk) and [Proton JS](https://www.npmjs.com/package/@proton/js) with a faucet application.

This application is made for distributing FOOBAR tokens for using and exploring Proton Demos. You may view the live version of this app at [Foobar Faucet](https://foobar.protonchain.com).

## To build and run locally

### Docker

Run a docker container:

```
docker build foobar-faucet .

docker images

docker run -p 3000:8080 -i -d [image id]
```

### npm

```
git clone https://github.com/ProtonProtocol/foobar-faucet.git

npm install

// You will need to start up the local frontend as well as the backend
npm start

npm run server
```

## Environment and local functionality

### Environment

- REACT_APP_RECAPTCHA: Register for reCAPTCHAv3 at [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create) and put the site key here

- RECAPTCHA_SECRET: reCAPTCHAv3 secret

- PRIVATE_KEY: Private key of account that is sending the tokens

- HYPERION_ENDPOINT: Hyperion endpoint needed for checking specific action history within a certain time frame

### Transact Modifications

In `server.js` modifications are necessary so that the account sending the token matches the PRIVATE_KEY in the `.env`.


```
  for (let i = 0; i < recentActionsResponse.actions.length; i++) {
    const currentAction = recentActionsResponse.actions[i];
    if (currentAction.act.data.from === 'foobar') { // replace
        res.status(500).send({
          code: 500,
          message: 'Limit Exceeded',
          error: {
            details: [
              {
                message: 'You must wait one hour from the last time you received FOOBAR before claiming more.'
              }
            ]
          }
        });
        return;
    }
  }
```

```
  const result = await api.transact({
    actions: [{
      account: 'xtokens', // usually this will be 'eosio.token' unless sending a wrapped token
      name: 'transfer',
      authorization: [{
        actor: 'foobar', // replace
        permission: 'active',
      }],
      data: {
        from: 'foobar',  // replace
        to: req.query.account,
        quantity: '2000.000000 FOOBAR', // update token
        memo: 'Foobar Faucet',
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
```