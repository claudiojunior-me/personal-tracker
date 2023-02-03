import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Fab, Icon } from 'native-base';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import HabitBrick from 'src/components/HabitBrick';
import { useHabits } from 'src/context/habits.context';
import { RootStackParamList } from 'src/types';
import { THabit } from 'src/types/habit';

import { View } from '../components/Themed';

type ScreenTwoProps = NativeStackScreenProps<RootStackParamList, 'Root'>

export default function TabTwoScreen({ navigation }: ScreenTwoProps) {
  const { habits, addNewHabit } = useHabits()

  const openModal = () => {
    navigation.navigate('Modal')
  }

  const clearHabits = () => {
    addNewHabit(habits[0], true)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: 'pink' }}
      >
        {habits.map(habit => <HabitBrick key={habit._id} habit={habit} />)}
      </ScrollView>

      <Fab placement='bottom-left' renderInPortal={false} shadow={2} size="sm" label='Clear' onPress={clearHabits} />
      <Fab renderInPortal={false} shadow={2} size="sm" label='Novo Hábito' onPress={openModal} />
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
