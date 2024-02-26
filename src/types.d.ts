export interface Task {
  title: string,
  done: boolean,
}

export interface TaskApi {
  [id: string]: Task
}