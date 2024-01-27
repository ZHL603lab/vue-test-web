export type CourseSubRaw = {
  course_type: string,
  type_name: string,
}

export type CourseRaw = {
  dict_type: string,
  course_stage: string,
  dict_label: string,
  child: CourseSubRaw[],
}

export type CourseSub = {
  type: string,
  name: string,
}

export type Course = {
  type: string,
  stage: string,
  label: string,
  child: CourseSub[],
}

export type CourseBookRaw = {
  course_code: string,
  course_name: string,
}

export type CourseVersionRaw = {
  course_version: string,
  child: CourseBookRaw[]
}

export type CourseVersion = {
  name: string,
  child: CourseVersion[],
}

export type CourseChapterRaw = {
  course_code: string
  course_name: string
  tree_leaf: string
  tree_level: number
}