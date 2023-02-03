import { Box, HStack, Spacer, Text, VStack } from 'native-base'
import { FlatList } from "react-native"
import { useHabits } from "src/context/habits.context"
import { THabit } from "src/types/habit"
import { View } from "../Themed"

const HabitsList = () => {
  const { habits } = useHabits()

  function keyExtractor(habit: THabit) {
    return habit.name
  }

  function renderHabitRow(habit: THabit) {
    return (
      <Box borderBottomWidth="1" _dark={{
        borderColor: "muted.50"
      }
      } borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2" >
        <HStack space={[2, 3]} justifyContent="space-between">
          <VStack>
            <Text _dark={{
              color: "warmGray.50"
            }} color="coolGray.800" bold>
              {habit.name}
            </Text>
          </VStack>
        </HStack>
      </Box >
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