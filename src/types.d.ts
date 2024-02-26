export interface Task {
  title: string,
  done: boolean,
}

export interface TaskFromApi {
  [id: string]: Task
}

export interface TaskWithId extends Task {
  id: string
}