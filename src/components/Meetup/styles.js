import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 150;
`;

export const Aligner = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  color: #999;
  margin-left: 5px;
`;

export const InfoOrganizer = styled.Text`
  font-size: 13px;
  color: #ff7400;
  margin-top: 15px;
  text-align: center;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 15px;
`;

export const UnsubscribeButton = styled(Button)`
  background-color: #fb916b;
  margin-top: 15px;
`;
