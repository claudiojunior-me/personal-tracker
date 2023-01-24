import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Chip } from 'react-native-ui-lib';
import { useTrackers } from '../context/trackers';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { dateMarked, trackers, addTrackForDate } = useTrackers()

  function onDayPress(day) {
    console.log(day?.dateString)
    addTrackForDate(day.dateString)
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
        trackers.map(tracker => (
          <Chip label={tracker.name} onPress={() => console.log('pressed')} backgroundColor={tracker.color} />
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
