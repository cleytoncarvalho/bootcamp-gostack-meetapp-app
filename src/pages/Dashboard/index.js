import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format, subDays, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import {
  Container,
  DateSelector,
  List,
  Loading,
  DateSelectorText,
  Empty,
  EmptyText,
} from './styles';

import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import DatePicker from '~/components/DatePicker';

const Dashboard = ({ isFocused }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: ptBR }),
    [date]
  );

  const findMeetups = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);

        const response = await api.get('/meetups', {
          params: { page, per_page: 2, date },
        });

        const data = response.data.meetups.map(m => {
          return {
            ...m,
            dateFormatted: format(parseISO(m.date), "dd 'de' MMMM', às' p'h'", {
              locale: ptBR,
            }),
          };
        });

        setLoading(false);
        setMeetups(m => [...m, ...data]);
        setCurrentPage(page);
        setMaxPage(Number(response.data.pagination.pages));
      } catch (err) {
        setLoading(false);

        Alert.alert('Ocorreu um erro!', 'Tente novamente.');
      } finally {
        setLoading(false);
      }
    },
    [date]
  );

  useEffect(() => {
    if (isFocused) {
      setMaxPage(1);
      setMeetups([]);
      findMeetups();
    }
  }, [findMeetups, isFocused]);

  function handlePrevDay() {
    setMeetups([]);
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setMeetups([]);
    setDate(addDays(date, 1));
  }

  function loadMore() {
    if (currentPage < maxPage) {
      findMeetups(currentPage + 1);
    }
  }

  return (
    <Container>
      <Header />

      <DateSelector>
        <TouchableOpacity onPress={handlePrevDay}>
          <Icon name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>

        <DatePicker
          date={date}
          onChange={selectedDate => setDate(selectedDate)}
        >
          <DateSelectorText>{dateFormatted}</DateSelectorText>
        </DatePicker>

        <TouchableOpacity onPress={handleNextDay}>
          <Icon name="chevron-right" size={30} color="#fff" />
        </TouchableOpacity>
      </DateSelector>

      {meetups.length > 0 && (
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup meetup={item} />}
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

      {meetups.length <= 0 && !loading && (
        <Empty>
          <Icon name="date-range" size={30} color="#fff" />
          <EmptyText>
            Nenhum meetup encontrado para a data selecionada.
          </EmptyText>
        </Empty>
      )}
    </Container>
  );
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
