import React, { useEffect, useState, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import { Container, List, Loading, Empty, EmptyText } from './styles';

import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

const Subscriptions = ({ isFocused }) => {
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const findSubscriptions = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      const response = await api.get('/subscriptions', {
        params: { page, per_page: 2 },
      });

      const data = response.data.subscriptions.map(m => {
        return {
          ...m,
          Meetup: {
            ...m.Meetup,
            subscribed: true,
            dateFormatted: format(
              parseISO(m.Meetup.date),
              "dd 'de' MMMM', às' p'h'",
              {
                locale: ptBR,
              }
            ),
          },
        };
      });

      setLoading(false);
      setSubscriptions(m => [...m, ...data]);
      setCurrentPage(page);
      setMaxPage(Number(response.data.pagination.pages));
    } catch (err) {
      setLoading(false);

      Alert.alert('Ocorreu um erro!', 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      setMaxPage(1);
      setSubscriptions([]);
      findSubscriptions();
    }
  }, [findSubscriptions, isFocused]);

  function loadMore() {
    if (currentPage < maxPage) {
      findSubscriptions(currentPage + 1);
    }
  }

  return (
    <Container>
      <Header />

      {subscriptions.length > 0 && (
        <List
          data={subscriptions}
          keyExtractor={item => String(item.Meetup.id)}
          renderItem={({ item }) => <Meetup meetup={item.Meetup} />}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          refreshing
        />
      )}

      {loading && (
        <Loading>
          <ActivityIndicator size={30} color="#fff" />
        </Loading>
      )}

      {subscriptions.length <= 0 && !loading && (
        <Empty>
          <Icon name="date-range" size={30} color="#fff" />
          <EmptyText>Você ainda não se inscreveu em nenhum meetup.</EmptyText>
        </Empty>
      )}
    </Container>
  );
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="assignment" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
