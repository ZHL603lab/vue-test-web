export type QuestionRaw = {
  id: string,
  main_part: string,
  type: string,
  answer: string,
  select_a: string,
  select_b: string,
  select_c: string,
  select_d: string,
  p_id: string,
}

export type QuestionBlank = {
  id: string,
  value: string,
  text: string,
}

export type QuestionOption = {
  id: string,
  value: string,
  text: string,
}

export type QuestionSubItem = {
  id: string,
  value: string | undefined,
  text: string,
}

export type Question = {
  id: string,
  body: string,
  type: string,
  typeId: string,
  pId: string,
  subitems: QuestionSubItem[],
  selectOptionId: string,
}