import { TMarkedDates } from '@src/types/dates'
import { THabit, THabitsContext, THabitsProviderProps } from '@src/types/habit'
import React, {
  Context,
  createContext, useContext, useEffect, useState
} from 'react'


export const HabitsContext: Context<THabitsContext> = createContext(undefined)

const initialHabits: THabit[] = [
  {
  name: 'Hábito 01',
  color: '#5f9ea0',
  dates: ['2023-01-09', '2023-01-10', '2023-01-22']
}, {
  name: 'Hábito 02',
  color: '#ffa500',
  dates: ['2023-01-15', '2023-01-16', '2023-01-17']
},
{
  name: 'Hábito 03',
  color: '#f0e68c',
  dates: ['2023-01-09', '2023-01-15', '2023-01-22']
  }
]


const HabitsProvider = ({ children }: THabitsProviderProps) => {
  const [habits, setHabits] = useState<THabit[]>([])
  const [dateMarked, setDateMarked] = useState<TMarkedDates>()

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

  useEffect(() => {
    console.log('load variables')
    setHabits(initialHabits)
    getTrackersToCalendar(initialHabits)
  }, [])


  function getTrackersToCalendar(trackersArr: THabit[]) {
    const datesObj: TMarkedDates = {}

    trackersArr.forEach(tracker => {
      tracker.dates?.forEach(date => {
        addOrCreate(datesObj, date, tracker.color)
      })
    })

    setDateMarked(datesObj)
  }

  function addTrackForDate(dateString: string) {
    const datesObj = { ...dateMarked }
    
    setDateMarked(addOrCreate(datesObj, dateString, '#c0c'))
  }

  return (
    <HabitsContext.Provider value={{
      habits,
      dateMarked,
      addTrackForDate
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