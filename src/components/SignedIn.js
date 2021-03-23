import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Title,
  Description,
  FeatureText,
  Coin,
  Br,
  Header,
  AvatarContainer,
  Avatar,
  UserName,
  Message,
} from '../pages/TopStyles';

const SignedIn = ({ accountData, logout }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [buttonText, setButtonText] = useState('Get tokens');

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const getTokens = (e) => {
    setErrorMessage('');
    setSuccessMessage('');
    setButtonText('Sending tokens...');
    e.preventDefault();
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.REACT_APP_RECAPTCHA, { action: 'submit' })
        .then((token) => {
          return window.fetch(
            `/api/get_tokens?token=${token}&account=${accountData.acc}`
          );
        })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            setButtonText('Get tokens');
            setErrorMessage(
              `${result.message}: ${result.error.details[0].message}`
            );
          } else {
            setButtonText('Success!');
            setSuccessMessage(
              'Please wait a moment for your wallet to update.'
            );
          }
        })
        .catch((response) => {
          setButtonText('Get tokens');
          if (response.message && response.error && response.error.details) {
            setErrorMessage(
              `${response.message}: ${response.error.details.message}`
            );
          } else {
            setButtonText('Get tokens');
            setErrorMessage(`Internal Service Error: Please try again later.`);
          }
        });
    });
  };

  return (
    <Container>
      <Header>
        <AvatarContainer alt="Logout" onClick={logout}>
          <Avatar
            style={{
              backgroundImage:
                accountData.avatar !== ''
                  ? `url('data:image/jpeg;base64,${accountData.avatar}')`
                  : `url('./images/default-avatar.png')`,
            }}
            alt="avatar"
          />
          <UserName>{accountData.name}</UserName>
        </AvatarContainer>
      </Header>
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
      <Button onClick={getTokens}>{buttonText}</Button>
      <Message className="error">{errorMessage}</Message>
      <Message className="success">{successMessage}</Message>
    </Container>
  );
};

export default SignedIn;
