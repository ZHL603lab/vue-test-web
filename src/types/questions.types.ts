export type QuestionRaw = {
  uuid: string
  subjectId: string
  chapterId: string
  body: string
  type: string
  answer: string
  explain: string
  selectA: string
  selectB: string
  selectC: string
  selectD: string
  selectE: string
  selectF: string
  sort: number
  state: string
}

export type Question = {
  uuid: string
  subjectId: string
  chapterId: string
  body: string
  type: string
  selects: {
    id: string
    text: string
  }[]
  sort: number
  state: string
}
