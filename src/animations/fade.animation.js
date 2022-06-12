import React, { useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

function FadeInView({ duration, children, ...props }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Fragment>
      <Animated.View style={{ ...props.style, opacity: fadeAnim }}>{children}</Animated.View>
    </Fragment>
  );
}

FadeInView.defaultProps = {
  duration: 1000,
};

FadeInView.propTypes = {
  duration: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

export default FadeInView;
