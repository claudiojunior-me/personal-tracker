import React from 'react';

import { StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useHabits } from '../context/habits.context';

import { AntDesign } from '@expo/vector-icons';
import { Actionsheet, Box, HStack, Icon, Text } from 'native-base';
import HabitsList from 'src/components/HabitsList';
import { THabit } from 'src/types/habit';
import { View } from '../components/Themed';

export default function TabOneScreen() {
  const { dateMarked, habits, addTrackForDate } = useHabits()

  const [isActionSheetOpen, setActionSheetOpen] = React.useState<boolean>(false)
  const [selectedDate, setSelectedDate] = React.useState<DateData | undefined>(undefined)

  function onDayPress(day: DateData) {
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

      <HabitsList />

      <Actionsheet isOpen={isActionSheetOpen} onClose={onCloseActionSheet}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="20" color="gray.500" _dark={{
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
                <HStack alignItems='center' space={3}>
                  <View style={{ backgroundColor: habit.color, height: 30, width: 30, borderRadius: 5 }} />
                  <Text>{habit.name}</Text>
                </HStack>
              </Actionsheet.Item>
            )
            )
          }
          <Actionsheet.Item
            leftIcon={<Icon as={AntDesign} name="close" size={8} />}
            onPress={onCloseActionSheet}
          >
            Cancelar
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
});
