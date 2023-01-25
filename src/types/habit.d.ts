import { TMarkedDates } from "./dates"

export type THabit = {
  name: string,
  color: string,
  dates?: string[]
}

export type THabitsProviderProps = {
  children: React.ReactNode,
}

export type THabitsContext = {
  habits: THabit[],
  dateMarked: TMarkedDates | undefined,
  addTrackForDate: (dateString: string, habit: THabit) => void
}