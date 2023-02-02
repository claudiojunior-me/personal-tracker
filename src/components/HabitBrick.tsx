import { StyleSheet } from "react-native"
import { Colors } from "react-native-ui-lib"
import { THabit } from "src/types/habit"
import { Text, View } from "./Themed"

type THabitBrickProps = {
  habit: THabit
}

const HabitBrick = ({ habit }: THabitBrickProps) => {
  console.log(Colors.isDark(habit.color))

  return (
    <View
      key={habit.name}
      style={{ ...styles.container, backgroundColor: habit.color }}
    >
      <Text style={styles.title}>{habit.name}</Text>
      <View style={styles.containerNumbers}>
        <Text style={styles.number}>{habit.dates?.length}</Text>
        <Text style={styles.helperText}>dias concluídos</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: 200,
    width: '100%',
    padding: 18
  },
  title: {
    flex: 1,
    fontSize: 30,
    marginBottom: 15
  },
  containerNumbers: {
    padding: 0,
    margin: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  number: {
    flex: 1,
    fontSize: 55,
    lineHeight: 55,
    margin: 0,
    padding: 0,
    marginBottom: -10,
    fontWeight: 'bold',
  },
  helperText: {
    margin: 0,
    padding: 0,

    lineHeight: 16,
    flex: 1,
    fontSize: 15
  }
});

export default HabitBrick