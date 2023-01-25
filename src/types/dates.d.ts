export type TMarkedDates = {
  [key: string]: {
    periods: {
      startingDay: boolean,
      endingDay: boolean,
      color: string
    }[]
  }
}