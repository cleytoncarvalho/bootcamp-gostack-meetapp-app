import React from 'react';
import { StatusBar, Image } from 'react-native';

import { Container } from './styles';

import logo from '~/assets/logo.png';

const Header = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#19161f" />

      <Container>
        <Image source={logo} style={{ width: 23 }} resizeMode="contain" />
      </Container>
    </>
  );
};

export default Header;
