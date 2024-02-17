export type BankCourseStageRaw = {
  dict_type: string,
  course_stage: string,
  dict_label: string,
  child: BankCourseRaw[],
}

export type BankCourseRaw = {
  course_type: string,
  type_name: string,
}

export type BankBookVersionRaw = {
  course_version: string,
  child: BankBookRaw[]
}

export type BankBookRaw = {
  course_code: string,
  course_name: string,
}

export type BankBookChapterRaw = {
  course_code: string
  course_name: string
  tree_leaf: string
  tree_level: number
}

export type BankPaperRaw = {
  id : string,
  course_stage : string,
  course_type : string,
  paper_name : string,
  paper_type : string,
  to_year : string
  grade : string,
  city: string,
  province : string,
}
