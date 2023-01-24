import React, {
  Context,
  createContext, useContext, useEffect, useState
} from 'react'

type TTrackers = {
  name: string,
  color: string,
  dates?: string[]
}

type TMarkedDates = {
  [key: string]: {
    periods: {
      startingDay: boolean,
      endingDay: boolean,
      color: string
    }[]
  }
}

type TTrackersProviderProps = {
  children: React.ReactNode,
}

type TTrackersContext = {
  trackers: any[],
  dateMarked: TMarkedDates | undefined,
  addTrackForDate: (dateString: string) => void
}

export const TrackersContext: Context<TTrackersContext> = createContext(undefined)

const initialTrackers: TTrackers[] = [
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

const TrackersProvider = ({ children }: TTrackersProviderProps) => {
  const [trackers, setTrackers] = useState<TTrackers[]>([])
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
    setTrackers(initialTrackers)
    getTrackersToCalendar(initialTrackers)
  }, [])


  function getTrackersToCalendar(trackersArr: TTrackers[]) {
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
    <TrackersContext.Provider value={{
      trackers,
      dateMarked,
      addTrackForDate
    }}>
      {children}
    </TrackersContext.Provider>
  )
}

export const useTrackers = () => {
  const context = useContext(TrackersContext)

  return context
}

export default TrackersProvider