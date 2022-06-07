import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Spacer, Text } from '../../../components';
import { AccountBackground, AccountContainer, AccountCover, AuthButton, AuthInput } from '../components/account.styles';
import { appContext } from '../../../context';

const { withAppContext } = appContext;

const LoginScreen = ({ onLogin, appStore }) => {
  const { authenticating, errorAuth } = appStore;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginHandler = () => {
    if (!email.trim() || !password.trim()) return;

    onLogin(email, password);
  };
  return (
    <AccountBackground resizeMode="cover">
      <AccountCover />
      <AccountContainer>
        <AuthInput
          disabled={authenticating}
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <Spacer size="large">
          <AuthInput
            disabled={authenticating}
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={setPassword}
          />
        </Spacer>
        <Spacer position="top" size="large">
          <AuthButton disabled={authenticating} icon="lock-open-outline" mode="contained" onPress={onLoginHandler}>
            Login
          </AuthButton>
        </Spacer>
        {errorAuth && (
          <Spacer size="large">
            <Text variant="error">{errorAuth}</Text>
          </Spacer>
        )}
      </AccountContainer>
    </AccountBackground>
  );
};

LoginScreen.propTypes = {
  onLogin: PropTypes.func.isRequired,
  appStore: PropTypes.shape({
    authenticating: PropTypes.bool.isRequired,
    errorAuth: PropTypes.string,
  }).isRequired,
};

export default withAppContext(LoginScreen);
