import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
`;

export const Form = styled.View`
  align-self: stretch;
  padding: 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SplitLine = styled.View`
  height: 1px;
  background-color: #979797;
  opacity: 0.1;
  margin: 20px 0;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const SignOutButton = styled(Button)`
  margin-top: 15px;
  background-color: #d44059;
  height: 42px;
`;
