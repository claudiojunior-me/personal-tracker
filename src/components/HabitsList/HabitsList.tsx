import { FlatList } from "react-native"
import { useHabits } from "src/context/habits.context"
import { THabit } from "src/types/habit"
import HabitListItem from './HabitListItem'

const HabitsList = () => {
  const { habits } = useHabits()

  function keyExtractor(habit: THabit) {
    return habit._id
  }

  return (
    <FlatList
      data={habits}
      renderItem={({ item }) => <HabitListItem habit={item} />}
      keyExtractor={keyExtractor}
    />
  )
}

export default HabitsList