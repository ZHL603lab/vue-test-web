import { type CourseRaw, type Course, type CourseSubRaw } from "@/types/courses.types";

export async function adapterCourse(courseRaw: CourseRaw) : Course {

  const childRaw: CourseSubRaw[] = [];

  for (let i = 0; i < courseRaw.child.length; ++i) {
    const sub = courseRaw.child[i];
    childRaw.push({
      type: sub.course_type,
      name: sub.type_name,
    })
  }

  const course: Course = {
    type: courseRaw.dict_type,
    stage: courseRaw.course_stage,
    label: courseRaw.dict_label,
    child: childRaw,
  };

  return course;

}