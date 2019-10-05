import React, { useState } from 'react';
import { Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

const DatePicker = ({ date, onChange, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  function showDatePicker() {
    setIsVisible(true);
  }

  function onChangeDate(__, selectedDate) {
    onChange(selectedDate);
    setIsVisible(false);
  }

  return (
    <>
      <Text onPress={showDatePicker}>{children}</Text>
      {isVisible && (
        <DateTimePicker
          mode="date"
          is24Hour
          value={date}
          display="calendar"
          onChange={onChangeDate}
        />
      )}
    </>
  );
};

DatePicker.propTypes = {
  children: PropTypes.element.isRequired,
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  date: new Date(),
  onChange: () => {},
};

export default DatePicker;
