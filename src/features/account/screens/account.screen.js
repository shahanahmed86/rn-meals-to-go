import React from 'react';
import PropTypes from 'prop-types';

import { Spacer } from '../../../components';
import { AccountBackground, AccountCover, AccountContainer, AuthButton, Title } from '../components/account.styles';

const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground resizeMode="cover">
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton icon="lock-open-outline" mode="contained" onPress={() => navigation.navigate('Login')}>
          Login
        </AuthButton>
        <Spacer position="top" size="large">
          <AuthButton icon="email" mode="contained" onPress={() => navigation.navigate('Register')}>
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};

AccountScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AccountScreen;
