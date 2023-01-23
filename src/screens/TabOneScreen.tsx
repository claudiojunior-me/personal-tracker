import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Hábitos</Text>
      <Calendar
        monthFormat={'MMM yyyy'}
        firstDay={0}
        enableSwipeMonths={true}
        markingType="multi-period"
        markedDates={{
          '2023-01-16': {
            periods: [
              { startingDay: true, endingDay: false, color: '#5f9ea0' },
              { startingDay: true, endingDay: true, color: '#ffa500' },
              { startingDay: true, endingDay: true, color: '#f0e68c' }
            ]
          },
          '2023-01-17': {
            periods: [
              { startingDay: false, endingDay: false, color: '#5f9ea0' },
              { startingDay: true, endingDay: true, color: '#ffa500' },
            ]
          },
          '2023-01-18': {
            periods: [
              { startingDay: false, endingDay: true, color: '#5f9ea0' },
              { startingDay: true, endingDay: false, color: '#f0e68c' }
            ]
          },
          '2023-01-19': {
            periods: [
              { startingDay: true, endingDay: true, color: '#ffa500' },
              { startingDay: false, endingDay: true, color: '#f0e68c' }
            ]
          }
        }}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
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
