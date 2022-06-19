import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import styled, { useTheme } from 'styled-components/native';

import { withAppContext } from '../../../context';
import { SafeArea, Text, Spacer } from '../../../components';

const ListItem = styled(List.Item)`
  padding: ${props => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

const SettingsBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/home_bg.jpg'),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

function SettingsScreen({ navigation, appStore, onLogout }) {
  const theme = useTheme();
  const { authenticating, user } = appStore;

  return (
    <SettingsBackground>
      <TransparentSafeArea>
        <AvatarContainer>
          <Spacer size="large">
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
              {user.photoURL ? (
                <Avatar.Image size={180} source={{ uri: user.photoURL }} />
              ) : (
                <Avatar.Icon size={180} icon="human" backgroundColor={theme.colors.brand.primary} />
              )}
            </TouchableOpacity>
          </Spacer>
          <Spacer size="large">
            <Text variant="label">{user.email}</Text>
          </Spacer>
        </AvatarContainer>
        <List.Section>
          <ListItem
            title="Favorites"
            description="View your favorites"
            left={props => <List.Icon {...props} color={theme.colors.ui.error} icon="heart" />}
            onPress={() => navigation.navigate('Favorites')}
          />
          <Spacer />
          <ListItem
            disabled={authenticating}
            title="Payment"
            left={props => <List.Icon {...props} color={theme.colors.ui.secondary} icon="cart" />}
            onPress={() => null}
          />
          <Spacer />
          <ListItem
            disabled={authenticating}
            title="Past Orders"
            left={props => <List.Icon {...props} color={theme.colors.ui.secondary} icon="history" />}
            onPress={() => null}
          />
          <Spacer />
          <ListItem
            disabled={authenticating}
            title="Logout"
            left={props => <List.Icon {...props} color={theme.colors.ui.secondary} icon="door" />}
            onPress={onLogout}
          />
        </List.Section>
      </TransparentSafeArea>
    </SettingsBackground>
  );
}

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  appStore: PropTypes.shape({
    authenticating: PropTypes.bool.isRequired,
    authError: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default withAppContext(SettingsScreen);
