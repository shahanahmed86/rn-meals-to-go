import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { Spacer, Text } from '../../../components';
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
} from '../components/account.styles';
import { appContext } from '../../../context';

const { withAppContext } = appContext;

const LoginScreen = ({ onLogin, appStore, navigation }) => {
  const { authenticating, authError } = appStore;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginHandler = () => {
    if (!email.trim() || !password.trim()) return;

    onLogin(email, password);
  };
  return (
    <AccountBackground resizeMode="cover">
      <AccountCover />
      <Title>Meals To Go</Title>
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
            onChangeText={setPassword}
          />
        </Spacer>
        <Spacer position="top" size="large">
          {!authenticating ? (
            <AuthButton icon="lock-open-outline" mode="contained" onPress={onLoginHandler}>
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating color={Colors.blue300} />
          )}
        </Spacer>
        {authError && (
          <ErrorContainer size="large">
            <Text variant="error">{authError}</Text>
          </ErrorContainer>
        )}
      </AccountContainer>
      <Spacer>
        <AuthButton disabled={authenticating} mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};

LoginScreen.propTypes = {
  onLogin: PropTypes.func.isRequired,
  appStore: PropTypes.shape({
    authenticating: PropTypes.bool.isRequired,
    authError: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withAppContext(LoginScreen);
