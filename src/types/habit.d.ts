import { TMarkedDates } from "./dates"

export type THabit = {
  _id: string,
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
  addTrackForDate: (dateString: string, habit: THabit) => void,
  addNewHabit: (newHabit: Partial<THabit>, rewriteAll?: boolean) => void,
}