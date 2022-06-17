import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styled from 'styled-components/native';
import { Spacer, Text } from '../../../components';
import { withAppContext, appActions } from '../../../context';

const dimensions = Dimensions.get('screen');

const cameraOptions = {
  cameraType: 'front',
  maxWidth: dimensions.width,
  maxHeight: dimensions.height,
};

const View = styled.View`
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

const ImageWrapper = styled.View`
  flex: 0.75;
  width: 100%;
`;

const Image = styled.Image`
  resize-mode: contain;
  flex: 1;
`;

const ActionsWrapper = styled.View`
  flex: 0.25;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

function CameraScreen({ navigation, appStore, appDispatch }) {
  const { user } = appStore;

  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const initiateCamera = useCallback(() => {
    launchCamera(cameraOptions, result => {
      if (!result) return;

      const hasCancelledProp = 'didCancel' in result;
      if (hasCancelledProp) {
        if (result.didCancel) navigation.goBack();
        return;
      }

      const hasErrorProp = 'errorMessage' in result;
      if (hasErrorProp) {
        if (result.errorMessage) setErrorMessage(result.errorMessage);
        return;
      }

      const hasAssetsProp = 'assets' in result;
      const asset = result.assets.find(_asset => 'uri' in _asset);

      if (!hasAssetsProp || !asset) {
        setErrorMessage('image not found');
        return;
      }

      setImageUri(asset.uri);
    });
  }, [navigation]);

  useEffect(initiateCamera, [initiateCamera]);

  const savePicture = async () => {
    try {
      setLoading(true);
      if (!imageUri) throw new Error('Image not found');

      await AsyncStorage.setItem(`@avatar-${user.uid}`, imageUri);
      appDispatch({ type: appActions.SAVE_PICTURE, payload: imageUri });

      navigation.goBack();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (errorMessage) {
    return (
      <View>
        <Text variant="error">{errorMessage}</Text>
      </View>
    );
  }

  if (!imageUri) return null;
  return (
    <View>
      <ImageWrapper>
        <Image source={{ uri: imageUri }} />
      </ImageWrapper>
      <ActionsWrapper>
        <Button disabled={loading} mode="contained" onPress={initiateCamera}>
          Re-take
        </Button>
        <Spacer position="left" size="small">
          <Button onPress={savePicture} disabled={loading} mode="contained">
            Save
          </Button>
        </Spacer>
      </ActionsWrapper>
    </View>
  );
}

CameraScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  appStore: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
  appDispatch: PropTypes.func.isRequired,
};

export default withAppContext(CameraScreen);
