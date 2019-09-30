import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Form,
  FormInput,
  SplitLine,
  SubmitButton,
  SignOutButton,
} from './styles';

import Header from '~/components/Header';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

const Profile = () => {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setPassword('');
    setOldPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header />

      <Form>
        <FormInput
          icon="person-outline"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome completo"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={name}
          onChangeText={setName}
        />

        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={email}
          onChangeText={setEmail}
        />

        <SplitLine />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Sua senha atual"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Nova senha"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={setPassword}
        />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Confirmação de senha"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Salvar perfil
        </SubmitButton>

        <SignOutButton onPress={handleSignOut}>Sair do Meetapp</SignOutButton>
      </Form>
    </Container>
  );
};

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};

export default Profile;
