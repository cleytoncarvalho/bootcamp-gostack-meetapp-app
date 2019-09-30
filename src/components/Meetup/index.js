import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Aligner,
  Image,
  Title,
  Info,
  InfoText,
  InfoOrganizer,
  SubscribeButton,
  UnsubscribeButton,
} from './styles';

import api from '~/services/api';

const Meetup = ({ meetup }) => {
  const user_id = useSelector(state => state.user.profile.id);

  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(meetup.subscribed);

  const isOrganizer = Number(meetup.User.id) === Number(user_id);

  async function handleSubscription() {
    setLoading(true);

    try {
      await api.post(`/subscriptions/${meetup.id}`);

      setSubscribed(true);
    } catch (err) {
      Alert.alert('Ocorreu um erro!', 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function handleUnsubscription() {
    setLoading(true);

    try {
      await api.delete(`/subscriptions/${meetup.id}`);

      setSubscribed(false);
    } catch (err) {
      Alert.alert('Ocorreu um erro!', 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Image source={{ uri: meetup.File.url }} />

      <Aligner>
        <Title>{meetup.title}</Title>

        <Info>
          <Icon name="event" color="#999" />
          <InfoText>{meetup.dateFormatted}</InfoText>
        </Info>
        <Info>
          <Icon name="place" color="#999" />
          <InfoText>{meetup.location}</InfoText>
        </Info>
        <Info>
          <Icon name="person" color="#999" />
          <InfoText>Organizador: {meetup.User.name}</InfoText>
        </Info>

        {isOrganizer && (
          <InfoOrganizer>Você é o organizador deste evento.</InfoOrganizer>
        )}

        {!isOrganizer && !subscribed && (
          <SubscribeButton
            disabled={meetup.past}
            loading={loading}
            onPress={handleSubscription}
          >
            Realizar inscrição
          </SubscribeButton>
        )}

        {!isOrganizer && subscribed && (
          <UnsubscribeButton
            disabled={meetup.past}
            loading={loading}
            onPress={handleUnsubscription}
          >
            Cancelar inscrição
          </UnsubscribeButton>
        )}
      </Aligner>
    </Container>
  );
};

Meetup.propTypes = {
  meetup: PropTypes.shape({
    id: PropTypes.number,
    past: PropTypes.bool,
    subscribed: PropTypes.bool,
    title: PropTypes.string,
    dateFormatted: PropTypes.string,
    location: PropTypes.string,

    File: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,

    User: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Meetup;
