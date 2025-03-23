export interface Data {
  data: {
    notes: Note[]
  }
}

export interface Note {
  id: number
  name: string
  note_url: string
}
