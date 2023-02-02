import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text } from 'react-native-ui-lib';
import { useHabits } from '../context/habits.context';

import HabitListItem from 'src/components/HabitListItem';
import { THabit } from 'src/types/habit';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { dateMarked, habits, addTrackForDate } = useHabits()

  function onDayPress(day) {
    console.log(day?.dateString)
    addTrackForDate(day.dateString, habits[0])
  }

  function keyExtractor(habit: THabit) {
    return habit.name
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Hábitos</Text>
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
