import { StyleSheet } from "react-native"
import { THabit } from "src/types/habit"
import { Text, View } from "./Themed"

type THabitListItemProps = {
  habit: THabit
}

const HabitListItem = ({ habit }: THabitListItemProps) => {
  return (
    <View
      key={habit.name}
      style={styles.container}
    >
      <View style={{ ...styles.viewColor, backgroundColor: habit.color }} />
      <Text style={styles.title}>{habit.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 55,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 16,
    lineHeight: 16,
  },
  viewColor: {
    marginRight: 12,
    height: 30,
    width: 60,
    borderRadius: 15
  }
});

export default HabitListItem