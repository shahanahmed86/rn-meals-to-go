import React from 'react';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import { Spacer } from '@meals-to-go/components';
import {
  AccountBackground,
  AccountCover,
  AnimationWrapper,
  AccountContainer,
  AuthButton,
  Title,
} from '../components/account.styles';

const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground resizeMode="cover">
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require('@meals-to-go/assets/watermelon.json')}
        />
      </AnimationWrapper>
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
