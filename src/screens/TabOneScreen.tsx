import { FlatList, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ListItem, Text } from 'react-native-ui-lib';
import { useHabits } from '../context/habits.context';

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

  function renderHabitRow(habit: THabit) {
    return (
      <View>
        <ListItem height={20}>
          <ListItem.Part left>
            <View style={{ height: 15, width: 15, backgroundColor: habit.color}} />
          </ListItem.Part>
          <ListItem.Part>
            <Text marginH-20 text60L>{habit.name}</Text>
          </ListItem.Part>
        </ListItem>
      </View>
    )
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
        renderItem={({ item, index }) => renderHabitRow(item)}
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
