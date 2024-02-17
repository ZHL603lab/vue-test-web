import {type Question, type QuestionRaw, type QuestionOption, type QuestionSubItem} from "@/types/views/room.types";

function adapterQuestion(questionRaw: QuestionRaw) : Question {

  const res : Question = {};
  res.id = questionRaw.id;
  res.typeId = questionRaw.type;
  res.pId = questionRaw.p_id;
  res.type = "暂不支持";

  if (questionRaw.type == '1') {
    res.type = "选择题";
    res.body = questionRaw.main_part;
  }
  if (questionRaw.type == '16') {
    res.type = "填空题";
    res.body = questionRaw.main_part
        .replace(/###/g, "_____");
  }

  const subitems: QuestionSubItem[] = [];
  if (questionRaw.select_a != "")
    subitems.push({
      id: questionRaw.id + "_A", value: undefined,
      text: questionRaw.select_a
    })
  if (questionRaw.select_b != "")
    subitems.push({
      id: questionRaw.id + "_B", value: undefined,
      text: questionRaw.select_b
    })
  if (questionRaw.select_c != "")
    subitems.push({
      id: questionRaw.id + "_C", value: undefined,
      text: questionRaw.select_c
    })
  if (questionRaw.select_d != "")
    subitems.push({
      id: questionRaw.id + "_D", value: undefined,
      text: questionRaw.select_d
    })

  res.subitems = subitems;

  return res;
}

function adapterQuestions(questionsRaw: QuestionRaw[]) : Question[] {
  const questions : Question[] = [];
  for (let i = 0; i < questionsRaw.length; ++i) {
    questions.push(adapterQuestion(questionsRaw[i]));
  }
  return questions;
}

export const adapter = {
  adapterQuestion,
  adapterQuestions,
}