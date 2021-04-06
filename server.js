require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util'); 
const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('@proton/js');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/get_tokens', async (req, res) => {
  const defaultPrivateKey = process.env.PRIVATE_KEY;
  const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
  const rpc = new JsonRpc(['https://proton.greymass.com'], { fetch });
  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
  try {
    const captchaResponseRaw = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${req.query.token}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      method: 'POST'
    })
    const captchaResponse = await captchaResponseRaw.json();
    if (captchaResponse && captchaResponse.score > 0.5) {
      const now = new Date();
      now.setHours(now.getHours() - 1);
      const withinOneHour = now.toISOString();

      const recentActionsResponseRaw = await fetch(`${process.env.HYPERION_ENDPOINT}/v2/history/get_actions?account=${req.query.account}&after=${withinOneHour}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const recentActionsResponse = await recentActionsResponseRaw.json();

      for (let i = 0; i < recentActionsResponse.actions.length; i++) {
        const currentAction = recentActionsResponse.actions[i];
        if (currentAction.act.data.from === 'foobar') {
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

      const result = await api.transact({
        actions: [{
          account: 'xtokens',
          name: 'transfer',
          authorization: [{
            actor: 'foobar',
            permission: 'active',
          }],
          data: {
            from: 'foobar',
            to: req.query.account,
            quantity: '2000.000000 FOOBAR',
            memo: 'Foobar Faucet',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      res.status(200).send({ result });
    } else {
      res.status(500).send({
        code: 500,
        message: 'Captcha Error',
        error: {
          details: [
            {
              message: 'You have failed the captcha requirements.'
            }
          ]
        }
      });
    }
  } catch (e) {
    if (e instanceof RpcError) {
      console.log(JSON.stringify(e.json, null, 2));
      res.status(500).send(e.json);
    } else {
      res.status(500).send({
        code: 500,
        message: 'Error',
        error: {
          details: [
            {
              message: 'Internal service error.'
            }
          ]
        }
      });
    }
  }
});


app.listen(process.env.PORT || 8080);