import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

const Button = ({ children, loading, disabled, onPress, ...rest }) => {
  onPress = !disabled ? onPress : () => {};

  return (
    <Container disabled={disabled} onPress={onPress} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  loading: false,
  disabled: false,
  onPress: () => {},
};

export default Button;
