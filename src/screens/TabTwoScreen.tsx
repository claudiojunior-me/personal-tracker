import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { Card, GridList, GridListProps, Text } from 'react-native-ui-lib';
import HabitBrick from 'src/components/HabitBrick';
import { useHabits } from 'src/context/habits.context';
import { THabit } from 'src/types/habit';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';

export default function TabTwoScreen() {
  const { habits } = useHabits()

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: 'pink' }}
      >
        {habits.map(habit => <HabitBrick habit={habit} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
