import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List } from 'react-native-paper';
import styled from 'styled-components/native';

import { appContext } from '../../../context';
import { SafeArea, Text, Spacer } from '../../../components';

const ListItem = styled(List.Item)`
  padding: ${props => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

const { withAppContext } = appContext;
function SettingsScreen({ navigation, appStore, onLogout }) {
  const { authenticating, user } = appStore;
  return (
    <SafeArea>
      <AvatarContainer>
        <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
        <Spacer size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <ListItem
          title="Favorites"
          description="View your favorites"
          left={props => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate('Favorites')}
        />
        <ListItem
          disabled={authenticating}
          title="Logout"
          left={props => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
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
