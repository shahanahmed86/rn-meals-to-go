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
import { withAppContext, appActions } from '../../../context';

const RegisterScreen = ({ onRegister, appStore, appDispatch, navigation }) => {
  const { authenticating, authError } = appStore;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegisterHandler = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) return;

    onRegister(email, password, confirmPassword);
  };
  const goBack = () => {
    appDispatch({ type: appActions.RESET });
    navigation.goBack();
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
        <Spacer size="large">
          <AuthInput
            disabled={authenticating}
            label="Confirm Password"
            value={confirmPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={setConfirmPassword}
          />
        </Spacer>
        <Spacer position="top" size="large">
          {!authenticating ? (
            <AuthButton icon="email" mode="contained" onPress={onRegisterHandler}>
              Register
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
        <AuthButton disabled={authenticating} mode="contained" onPress={goBack}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};

RegisterScreen.propTypes = {
  onRegister: PropTypes.func.isRequired,
  appStore: PropTypes.shape({
    authenticating: PropTypes.bool.isRequired,
    authError: PropTypes.string,
  }).isRequired,
  appDispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withAppContext(RegisterScreen);
