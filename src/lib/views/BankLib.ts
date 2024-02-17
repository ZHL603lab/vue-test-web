import {reactive, ref} from "vue";
import axios from "axios";
import {
  type BankBookChapterRaw,
  type BankCourseStageRaw,
  type BankCourseRaw,
  type BankBookRaw,
  type BankBookVersionRaw,
  type BankPaperRaw,
} from '@/types/views/bank.types'

let config = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Authorization': '', // 可选：如果需要验证，请在请求头中添加令牌
  },
};

const apiUrl = "http://jsjxxw.cn:3009/api";

function getCourse() {
  axios.post(apiUrl + "/c/getcourse")
    .then(function (res) {
      if (!res.data.course || !res.data.course[0]) return ;
      bankVal.stages = res.data.course;
      const stage : BankCourseStageRaw = res.data.course[0];
      bankVal.selectStage = stage.course_stage;
      bankVal.selectStageName = stage.dict_label;
      const course : BankCourseRaw = stage.child[0];
      bankVal.selectCourse = course.course_type;
      bankVal.selectCourseName = course.type_name;
      getBookVersion();
    })
}

function getBookVersion() {
  axios.get(apiUrl + "/c/getcourseversion", {
    params: {
      course_stage: bankVal.selectStage,
      course_type: bankVal.selectCourse,
    }, headers: config.headers
  }).then(function (res) {
    bankVal.bookVersions = res.data.course;
    const version : BankBookVersionRaw = res.data.course[0];
    const book : BankBookRaw = version.child[0];
    bankVal.selectBook = book.course_code;
    bankVal.selectChapter = undefined;
    getBookChapter();
    bankVal.selectPage = 1;
    getPaper();
  });
}

function getBookChapter() {
  axios.get(apiUrl + "/c/getcoursechapter", {
    params: {
      course_code: bankVal.selectBook,
    },
    headers: config.headers
  }).then(function (res) {
    bankVal.bookChapters = res.data.course;
  })
}

function getPaper() {
  const course_code = bankVal.selectChapter || bankVal.selectBook;
  const offset:number = (bankVal.selectPage - 1) * bankVal.pageLimit;

  axios.get(apiUrl + "/p/getpaper", {
    params: {
      course_code,
      offset,
      limit: bankVal.pageLimit,
    }, headers: config.headers
  }).then(function (res) {
    bankVal.papers = res.data.course;
    bankVal.paperNum = res.data.paperTitleCnt;
  })
}

function init() {
  getCourse();
}

function handleClickStage({stage, course}: {
  stage: BankCourseStageRaw, course: BankCourseRaw
}) {
  bankVal.selectStage = stage.course_stage;
  bankVal.selectStageName = stage.dict_label;
  bankVal.selectCourse = course.course_type;
  bankVal.selectCourseName = course.type_name;
  getBookVersion();
}

function handleClickBook({book}: {
  book: BankBookRaw
}) {
  bankVal.bookChapters = [];
  bankVal.selectChapter = undefined;
  bankVal.selectBook = book.course_code;
  getBookChapter();
  getPaper();
}

function handleClickChapter({chapter}: {
  chapter: BankBookChapterRaw
}) {
  bankVal.selectChapter = chapter.course_code;
  getPaper();
}

function handleClickPagination() {
  getPaper();
}

export const bankFun = {
  init,
  handleClickStage,
  handleClickBook,
  handleClickChapter,
  handleClickPagination,
};

export const bankVal: {
  stages: BankCourseStageRaw[],
  bookVersions: BankBookVersionRaw[],
  bookChapters: BankBookChapterRaw[],
  papers: BankPaperRaw[],
  paperNum: number,
  selectStage: string,
  selectStageName: string,
  selectCourse: string,
  selectCourseName: string,
  selectBook: string,
  selectChapter: string | undefined,
  selectPage: number,
  pageLimit: number,
} = reactive({
  stages: [],
  bookVersions: [],
  bookChapters: [],
  papers: [],
  paperNum: 0,
  selectStage: "",
  selectStageName: "",
  selectCourse: "",
  selectCourseName: "",
  selectBook: "",
  selectChapter: undefined,
  selectPage: 1,
  pageLimit: 5,
});
