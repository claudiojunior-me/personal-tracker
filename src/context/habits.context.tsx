import React, {
  Context,
  createContext, useContext, useEffect, useState
} from 'react'
import uuid from 'react-native-uuid'
import { STORAGE_HABIT_KEYS } from 'src/core/Habit'
import { getFromStorage, setFromStorage } from 'src/core/Storage'
import { TMarkedDates } from 'src/types/dates'
import { THabit, THabitsContext, THabitsProviderProps } from 'src/types/habit'

export const HabitsContext: Context<THabitsContext> = createContext(undefined)

const initialHabits: THabit[] = [
  {
    _id: uuid.v4().toString(),
    name: 'Hábito de Exemplo',
    color: '#5f9ea0',
    dates: ['2023-01-09', '2023-01-10', '2023-01-22']
  }, {
    _id: uuid.v4().toString(),
    name: 'Hábito 02',
    color: '#ffa500',
    dates: ['2023-01-15', '2023-01-16', '2023-01-17']
  },
  {
    _id: uuid.v4().toString(),
    name: 'Hábito 03',
    color: '#f0e68c',
    dates: ['2023-01-09', '2023-01-15', '2023-01-22']
  }
]


const HabitsProvider = ({ children }: THabitsProviderProps) => {
  const [habits, setHabits] = useState<THabit[]>([])
  const [dateMarked, setDateMarked] = useState<TMarkedDates>({})

  const addOrCreate = (datesObjParam: TMarkedDates, dateKey: string, color: string) => {
    if (!!datesObjParam[dateKey]) {
      datesObjParam[dateKey].periods.push({
        startingDay: true,
        endingDay: true,
        color: color,
      })
      return datesObjParam
    }

    datesObjParam[dateKey] = {
      periods: [{
        startingDay: true,
        endingDay: true,
        color: color,
      }]
    }

    return datesObjParam
  }

  function getTrackersToCalendar(trackersArr: THabit[]) {
    const datesObj: TMarkedDates = {}

    trackersArr.forEach(tracker => {
      tracker.dates?.forEach(date => {
        addOrCreate(datesObj, date, tracker.color)
      })
    })

    setDateMarked(datesObj)
  }

  function addTrackForDate(dateString: string, habit: THabit) {
    const datesObj = { ...dateMarked }

    setDateMarked(addOrCreate(datesObj, dateString, habit.color))

    setHabits(
      habits.map(habitInMap => {
        if (habitInMap._id === habit._id) {
          const changedHabit = { ...habitInMap }
          changedHabit.dates?.push(dateString)
          return changedHabit
        }

        return habitInMap
      })
    )
  }

  function addNewHabit(newHabit: THabit, rewriteAll = false) {
    if (!newHabit._id) {
      newHabit._id = uuid.v4().toString()
      newHabit.dates = []
    }

    const oldHabits = habits.filter(habit => habit._id !== newHabit._id)

    setHabits(
      rewriteAll ?
        [newHabit] :
        [newHabit, ...oldHabits]
    )
  }

  useEffect(() => {
    async function loadFromStorage() {
      const loadedData = await getFromStorage(STORAGE_HABIT_KEYS)

      if (loadedData) {
        setHabits(loadedData)
      }
      // else {
      //   setHabits(initialHabits)
      // }
    }

    loadFromStorage()
  }, [])

  useEffect(() => {
    getTrackersToCalendar(habits)
    setFromStorage(STORAGE_HABIT_KEYS, habits)
  }, [habits])

  return (
    <HabitsContext.Provider value={{
      habits,
      dateMarked,
      addTrackForDate,
      addNewHabit
    }}>
      {children}
    </HabitsContext.Provider>
  )
}

export const useHabits = () => {
  const context = useContext(HabitsContext)

  return context
}

export default HabitsProvider