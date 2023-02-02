import { FlatList } from "react-native"
import { ListItem } from "react-native-ui-lib"
import { useHabits } from "src/context/habits.context"
import { THabit } from "src/types/habit"
import { Text, View } from "../Themed"

const HabitsList = () => { 
  const { habits } = useHabits()

  function keyExtractor(habit: THabit) {
    return habit.name
  }

  function renderHabitRow(habit: THabit) {
    return (
      <View>
        <ListItem height={20}>
          <ListItem.Part left>
            <View style={{ height: 15, width: 15, backgroundColor: habit.color }} />
          </ListItem.Part>
          <ListItem.Part>
            <Text>{habit.name}</Text>
          </ListItem.Part>
        </ListItem>
      </View>
    )
  }

  return (
    <FlatList
      data={habits}
      renderItem={({ item }) => renderHabitRow(item)}
      keyExtractor={keyExtractor}
    />
  )
}

export default HabitsList