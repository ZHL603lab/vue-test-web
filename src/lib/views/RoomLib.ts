import {reactive} from "vue";
import axios from "axios";
import {adapter} from "@/lib/adapter";
import {mathjax} from "@/lib/mathjax";
import type {Question} from "@/types/views/room.types";

const apiUrl = "http://jsjxxw.cn:3009/api";

let config = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': '', // 可选：如果需要验证，请在请求头中添加令牌
    },
};

function getQuestions() {
    axios.get(apiUrl + "/p/getquestion", {
        params: {
            paper_id: roomVal.paperId,
        }, headers: config.headers,
    }).then(function (res) {
        console.log(res.data);
        if (res.data.questions == "未找到知识点") {
            console.log(res.data);
            // TODO
        } else {
            roomVal.paperName = res.data.paper_name;
            roomVal.questions = adapter.adapterQuestions(res.data.questions);
            console.log(roomVal.questions);
            mathjax.render();
        }
    })
}

function init(id) {
    roomVal.paperId = id;
    getQuestions();
}

function handleClickSubmit() {
    for (let i = 0; i < roomVal.questions.length; ++i) {
        const question : Question = roomVal.questions[i];
        for (let j = 0; j < question.subitems.length; ++j) {
            const subitem = question.subitems[j];
            if (question.typeId == "1") {
                if (subitem.id == question.selectOptionId) {
                    console.log(subitem.text);
                }
            }

            if (question.typeId == "16") {
                console.log(subitem.value);
            }
        }
    }
}

export const roomFun = {
    init,
    handleClickSubmit,
}

export const roomVal : {
    paperId: string,
    paperName: string,
    questions: Question[],
} = reactive({
    paperId: "",
    paperName: "",
    questions: [],
})
