import React from 'react';
import {
  Container,
  Button,
  Title,
  Description,
  FeatureText,
  Coin,
  Header,
  Br,
  Error,
} from '../pages/TopStyles';

const Login = ({ login, error }) => {
  return (
    <Container>
      <Header />
      <Coin src="./images/coin.svg" />

      <Title>
        The Foobar token is <Br for="mobile" />
        the <Br for="desktop" />
        <FeatureText>demo token</FeatureText> for all Proton Demos{' '}
      </Title>
      <Description>
        Click to get 2,000 FooBar tokens delivered into your Proton Wallet. These
        tokens can be used in multiple demo apps. New tokens available every
        hour.
      </Description>
      <Button onClick={login}>Connect Wallet</Button>
      {error ? <Error>{error}</Error> : null}
    </Container>
  );
};

export default Login;
