import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Fab, Icon } from 'native-base';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import HabitBrick from 'src/components/HabitBrick';
import { useHabits } from 'src/context/habits.context';
import { RootStackParamList } from 'src/types';
import { THabit } from 'src/types/habit';

import { View } from '../components/Themed';

export default function TabTwoScreen() {
  const { habits, addNewHabit } = useHabits()
  const navigation = useNavigation()

  const openModal = (habit?: THabit) => {
    navigation.navigate('Modal', {
      habit
    })
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
        {habits.map(habit => <HabitBrick key={habit._id} habit={habit} onClick={openModal} />)}
      </ScrollView>

      {/* <Fab placement='bottom-left' renderInPortal={false} shadow={2} size="sm" label='Deixar apenas 1' onPress={clearHabits} /> */}
      <Fab
        backgroundColor='base.primary'
        renderInPortal={false}
        shadow={2}
        icon={<Icon color="white" as={AntDesign} name="plus" size='md' />}
        // size="sm"
        label='Novo Hábito'
        onPress={() => openModal()}
      />
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
