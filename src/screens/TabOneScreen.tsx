import React from 'react';

import { FlatList, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useHabits } from '../context/habits.context';

import { useNavigation } from '@react-navigation/native';
import { Actionsheet, Box, Text } from 'native-base';
import HabitListItem from 'src/components/HabitListItem';
import { THabit } from 'src/types/habit';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen() {
  const { dateMarked, habits, addTrackForDate } = useHabits()
  const navigation = useNavigation()

  const [isActionSheetOpen, setActionSheetOpen] = React.useState<boolean>(false)
  const [selectedDate, setSelectedDate] = React.useState<DateData | undefined>(undefined)

  function onDayPress(day: DateData) {
    console.log(day?.dateString)
    // navigation.navigate('SelectHabitsModal', {
    //   selectedDay: day
    // })
    // addTrackForDate(day.dateString, habits[0])
    setSelectedDate(day)
  }

  function onSelectHabitOnActionSheet(habit: THabit) {
    if (!selectedDate) {
      return
    }

    addTrackForDate(selectedDate.dateString, habit)
    setSelectedDate(undefined)
  }

  function onCloseActionSheet() {
    setSelectedDate(undefined)
  }

  React.useEffect(() => {
    if (!selectedDate) {
      setActionSheetOpen(false)
      return
    }

    setActionSheetOpen(true)
  }, [selectedDate])

  function keyExtractor(habit: THabit) {
    return habit._id
  }

  React.useEffect(() => {
    console.log(habits)
    console.log(dateMarked)
  }, [habits, dateMarked])

  return (
    <View style={styles.container}>
      <Calendar
        monthFormat={'MMM yyyy'}
        firstDay={0}
        onDayPress={onDayPress}
        enableSwipeMonths={true}
        markingType="multi-period"
        markedDates={dateMarked}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <FlatList
        data={habits}
        renderItem={({ item }) => <HabitListItem habit={item} />}
        keyExtractor={keyExtractor}
      />

      <Actionsheet isOpen={isActionSheetOpen} onClose={onCloseActionSheet}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="16" color="gray.500" _dark={{
              color: "gray.300"
            }}>
              Qual hábito deseja marcar como feito?
            </Text>
          </Box>

          {
            habits.map(habit => (
              <Actionsheet.Item
                key={habit._id}
                onPress={() => onSelectHabitOnActionSheet(habit)}
              >
                {habit.name}
              </Actionsheet.Item>
            )
            )
          }
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
