import data from "../json/question.json" assert { type: "json" };
let question_details = data;

import comman from './comman.js';
let com = new comman();

import notification from './toasts.js';
let notifications = new notification();

var random_question_no = 0;
const displayQuestions = document.getElementById('display_questions');
const showQuestionList = document.getElementById('show-question-list');

const min = document.getElementById("min");
const sec = document.getElementById("sec");

const queAnswered = document.getElementById('que-answered-no');
const queMarked = document.getElementById('que-marked-no');
const queNotAnswered = document.getElementById('que-not-answered-no');
const queNotVisited = document.getElementById('que-not-visited-no');

const toastsNotification = document.getElementById('toasts');

var question_no = 0;
var que = '';

var total_marks = 0;

var que_answered = 0;
var que_marked = 0;
var que_not_answered = 0;
var que_not_visited = 0;

var class_Name = "";

var isQuestionAnswered = false;

var dis_count = [];
var selected_question_list = [];

function show_question() {
    let i = 0;
    while (i < 5) {
        random_question_no = Math.floor(Math.random() * 10);
        selected_question_list.push(question_details[random_question_no]);
        selected_question_list = [... new Set(selected_question_list)];
        i = selected_question_list.length;
    }
    // show_tips();

    console.log(selected_question_list);


    display_summary();
    display_question_details();
    display_questions(0);
    time_count();
}

function display_question_details() {
    var show_question_list = "";
    for (let i = 0; i < selected_question_list.length; i++) {
        show_question_list += `<li id="question-${i}" class="">${i + 1}</li>`
    }
    showQuestionList.innerHTML = show_question_list;
}

document.getElementById('btn-next').addEventListener('click', function () {
    if (question_no < selected_question_list.length - 1) {
        const questionList = document.getElementById(`question-${question_no}`);
        class_Name = questionList.className;
        question_answered(class_Name, selected_question_list[question_no].selected_ans, questionList);
        question_no += 1;
    } else {
        //createNotification(toastsNotification,'You are in last Question', 'success');
        notifications.showSuccess(toastsNotification, 'You are in last Question !!', 'warning')
    }
    display_questions(question_no);
});

document.getElementById('btn-prev').addEventListener('click', function () {
    if (question_no != 0) {
        const questionList = document.getElementById(`question-${question_no}`);
        class_Name = questionList.className;
        question_answered(class_Name, selected_question_list[question_no].selected_ans, questionList);
        question_no -= 1;
    } else {
        //createNotification('You are in last Question', 'success');
        notifications.showSuccess(toastsNotification, 'You are in last Question !!', 'warning')
    }
    display_questions(question_no);
});

function display_questions(index) {
    const questionNo = document.getElementById('question-no');
    const totalQuestions = document.getElementById('total-questions');

    questionNo.innerText = index + 1;
    totalQuestions.innerText = selected_question_list.length;

    const result = selected_question_list[index];

    console.log(result);

    que = `<p id="question">${index + 1}.${com.titleCase(result?.question)}</p>
                    <div class="show-option">
                    <label>A) <input type="radio" name="option${result?.id}" id="option${result.id}" value="A" ${result?.selected_ans != '' ? 'disabled' : ''} ${result?.selected_ans == 'A' ? 'checked' : ''}/>&nbsp;${com.titleCase(result?.option[0].A)}</label>
                    <label>B) <input type="radio" name="option${result?.id}" id="option${result.id}" value="B" ${result?.selected_ans != '' ? 'disabled' : ''} ${result?.selected_ans == 'B' ? 'checked' : ''}/>&nbsp;${com.titleCase(result?.option[1].B)}</label>
                    <label>C) <input type="radio" name="option${result?.id}" id="option${result.id}" value="C" ${result?.selected_ans != '' ? 'disabled' : ''} ${result?.selected_ans == 'C' ? 'checked' : ''}/>&nbsp;${com.titleCase(result?.option[2].C)}</label>
                   <label>D) <input type="radio" name="option${result?.id}" id="option${result.id}" value="D"  ${result?.selected_ans != '' ? 'disabled' : ''} ${result?.selected_ans == 'D' ? 'checked' : ''}/>&nbsp;${com.titleCase(result?.option[3].D)}</label>
                   </div>`;
    displayQuestions.innerHTML = que;

    const input = document.querySelectorAll('input[type="radio"]');

    input.forEach((item, i) => {
        input[i].addEventListener('click', function () {
            if (input[i].checked) {
                console.log(index);
                selected_question_list[index].selected_ans = (input[i].value);
                isQuestionAnswered = true;
            }
        });

    });
}

document.getElementById('btn-result').addEventListener('click', function () {
    // debugger;
    localStorage.setItem('answerwd_question', JSON.stringify(selected_question_list));
    const index = (window.location.href).lastIndexOf('/');
    const path = (window.location.href).slice(0, index + 1) + "result.html";
    window.location.href = path;
})

function reset() {
    dis_count.forEach((item) => {
        const radio = document.getElementsByName(`option${item}`);
        radio.forEach((q, i) => {
            radio[i].disabled = false;
            radio[i].checked = false;
        });
    });

    min.innerHTML = 2;
    sec.innerHTML = 30;
    total_marks = 0;
    question_no = 0;
    que = '';
    que_answered = 0;
    que_marked = 0;
    que_not_answered = 0;
    que_not_visited = 0;

    isQuestionAnswered = false;
    selected_question_list = [];
    dis_count = [];
    show_question();

    document.getElementById("btn-result").disabled = true;
}

function time_count() {
    var minutes = min.innerHTML;
    var seconds = sec.innerHTML;

    let interval = setInterval(function () {
        seconds -= 1;
        if (minutes < 0) return;
        else if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
        }
        else if (seconds < 10) seconds = '0' + seconds;
        min.innerHTML = "0" + minutes;
        sec.innerHTML = seconds;
        if (minutes == 0 && seconds == 0) {
            clearInterval(interval);
        }
    }, 1000);

}

function question_answered(class_Name, selected_ans, questionList) {
    if (isQuestionAnswered && selected_ans != "" && class_Name == "") {
        questionList.classList.add('answered-question');
        ++que_answered;
        --que_not_visited
    } else if (!isQuestionAnswered && selected_ans == "" && class_Name == "") {
        questionList.classList.add('visited-question');
        ++que_not_answered;
        --que_not_visited
    } else if (isQuestionAnswered && selected_ans != "" && class_Name == "visited-question") {
        questionList.classList.remove('visited-question');
        questionList.classList.add('answered-question');
        --que_not_answered;
        ++que_answered;
    }
    queAnswered.innerText = que_answered;
    queNotAnswered.innerText = que_not_answered;
    queNotVisited.innerText = que_not_visited;
    isQuestionAnswered = false;
}

function display_summary() {
    que_not_visited = selected_question_list.length;
    queAnswered.innerText = que_answered;
    queMarked.innerText = que_marked;
    queNotAnswered.innerText = que_not_answered;
    queNotVisited.innerText = que_not_visited;
}
show_question();