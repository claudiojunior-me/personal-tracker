import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Chip } from 'react-native-ui-lib';
import { useHabits } from '../context/habits.context';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { dateMarked, habits, addTrackForDate } = useHabits()

  function onDayPress(day) {
    console.log(day?.dateString)
    addTrackForDate(day.dateString, habits[0])
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

      {
        habits.map(habit => (
          <Chip key={habit.name} label={habit.name} onPress={() => console.log('pressed')} backgroundColor={habit.color} />
        ))
      }
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
