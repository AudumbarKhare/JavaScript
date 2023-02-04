var random_question_no = 0;//random_question_id
const displayQuestions = document.getElementById('display_questions');
const showQuestionList = document.getElementById('show-question-list');

const min = document.getElementById("min");
const sec = document.getElementById("sec");

const queAnswered = document.getElementById('que-answered-no');
const queMarked = document.getElementById('que-marked-no');
const queNotAnswered = document.getElementById('que-not-answered-no');
const queNotVisited = document.getElementById('que-not-visited-no');

var question_no = 0;
var que = '';

var total_marks = 0;

var que_answered = 0;
var que_marked = 0;
var que_not_answered = 0;
var que_not_visited = 0;

var isQuestionAnswered = false;

var questions_list = [];
var dis_count = [];

const question_details = [
    {
        id: 1,
        question: "what is the full form of IPL?",
        answer: 1,
        option: [
            { A: "Indian Premier League", ans: 1 },
            { B: "Indian Player League", ans: 0 },
            { C: "Indian Posatal League", ans: 0 },
            { D: "Indian Pro League", ans: 0 }
        ]
    },
    {
        id: 2,
        question: "Which country has started IPL?",
        answer: 1,
        option: [
            { A: "India", ans: 1 },
            { B: "South Africa", ans: 0 },
            { C: "Australia", ans: 0 },
            { D: "England", ans: 0 }
        ]

    },
    {
        id: 3,
        question: "In which year did IPL start?",
        answer: 1,
        option: [
            { A: "In 2005", ans: 0 },
            { B: "In 2007", ans: 0 },
            { C: "In 2008", ans: 1 },
            { D: "In 2010", ans: 0 }
        ]
    },
    {
        id: 4,
        question: "How many teams are in the IPL right now?",
        answer: 1,
        option: [
            { A: "7 Teams", ans: 0 },
            { B: "8 Teams", ans: 0 },
            { C: "11 Teams", ans: 0 },
            { D: "10 Teams", ans: 1 }
        ]
    },
    {
        id: 5,
        question: "Which player was the first time to hit a six and a four in the IPL?",
        answer: 1,
        option: [
            { A: "Chris Gayle", ans: 0 },
            { B: "Virat Kohli", ans: 0 },
            { C: "Brendon McCullum.", ans: 1 },
            { D: "AB de Villiers.", ans: 0 }
        ]
    },
    {
        id: 6,
        question: "Which player scored the first century in IPL?",
        answer: 1,
        option: [
            { A: "Chris Gayle", ans: 0 },
            { B: "Virat Kohli", ans: 0 },
            { C: "Brendon McCullum.", ans: 1 },
            { D: "AB de Villiers.", ans: 0 }
        ]
    },
    {
        id: 7,
        question: "Which is the team that has won the most IPL trophy?",
        answer: 1,
        option: [
            { A: "Chennai Super King", ans: 0 },
            { B: "Mumbai Indians", ans: 1 },
            { C: "Sunrisers Hyderabad", ans: 0 },
            { D: "Delhi Capitals", ans: 0 }
        ]
    },
    {
        id: 8,
        question: "Which IPL team was banned for 2 years?",
        answer: 1,
        option: [
            { A: "Chennai Super King or Rajasthan Royal", ans: 1 },
            { B: "New Super Kings or Royal Challenger Bangalore", ans: 0 },
            { C: "Mumbai Indians or Royal Challenger Bangalore", ans: 0 },
            { D: "Delhi Capitals or or Kolkata Knight Riders", ans: 0 }
        ]
    },
    {
        id: 9,
        question: "Which batsman scored the most runs in the first season of IPL?",
        answer: 1,
        option: [
            { A: " Virender Sehwag", ans: 0 },
            { B: "Shaun Marsh", ans: 0 },
            { C: "Matthew Hayden", ans: 1 },
            { D: "Mahendra Singh Dhoni", ans: 0 }
        ]
    },
    {
        id: 10,
        question: "Which player has been out at zero the most times in IPL?",
        answer: 1,
        option: [
            { A: "Harbhajan Singh", ans: 0 },
            { B: "Mandeep Singh", ans: 1 },
            { C: "Piyush Chawla", ans: 0 },
            { D: "Ajinkya Rahane", ans: 0 }
        ]
    },
];

const note = [
    "Each Question has 5 marks.",
    "Minimum 15 Marks are required To pass the exam.",
    "A minimum of 3 question are required to attent to submit",
    "Each Question has 30 second.to complete.",
    "You can answer a question only once.",
    "2 min 30 sec time you have complete the exam."
];



function show_question() {
    for (let i = 1; i < 6; i++) {
        var flag = 0;
        random_question_no = Math.floor(Math.random() * 10);
        if (questions_list.length === 0) {
            flag = 0;
        } else {
            questions_list.forEach(item => {
                if (item == random_question_no) {
                    flag = 1;
                    return false;
                }
            });
        }

        flag == 1 ? i = i - 1 : questions_list.push(random_question_no);
    }
    // show_tips();
    display_questions();
    display_summary();
    display_question_details();
    time_count();
}

// function show_tips() {
//     var display_note = "";
//     note.forEach(note => {
//         display_note = display_note + `<li>${note}</li>`;
//     });
//     display_note = `<ul> ${display_note}</ul>`
//     document.getElementById('show-note').innerHTML = display_note;
//     console.log(document.getElementById('show-note'));
// }

function display_question_details() {
    //showQuestion
    var show_question_list = "";
    for (let i = 0; i < questions_list.length; i++) {
        show_question_list += `<li id="question-${i}">${i + 1}</li>`
    }
    showQuestionList.innerHTML = show_question_list;

}

function display_questions(type_action = '') {
    const questionNo = document.getElementById('question-no');
    const totalQuestions = document.getElementById('total-questions');
    const questionList = document.getElementById(`question-${question_no}`);

    //debugger;
    if (type_action === "Next") {
        console.log(question_no + " " + questions_list.length);
        if (question_no < questions_list.length - 1) {
            questionList.classList.add('visited-question');
            queNotVisited.innerText = --que_not_visited;
        }

        if (isQuestionAnswered) {
            ++que_answered;
            isQuestionAnswered = false;
            queAnswered.innerText = que_answered;
        } else {
            ++que_not_answered;
            queNotAnswered.innerText = que_not_answered;
        }

        question_no += 1;

        if (question_no > questions_list.length - 1) {
            alert('You are in last Question');
            question_no -= 1;
        }

    } else if (type_action === "Prev") {
        if (question_no != 0) questionList.classList.add('visited-question');

        question_no -= 1;

        if (question_no < 0) {
            alert('You are in first Question');
            question_no += 1;
        }
    }
    questionNo.innerText = question_no + 1;
    totalQuestions.innerText = questions_list.length;

    const result = question_details.find((item, index) => {
        if (index == questions_list[question_no]) return item;
    });

    que = `<p id="question">${question_no + 1}.${result.question}</p>
                <div class="show-option">
                <label>A) <input type="radio" name="option${result.id}" id="option${result.id}" value="${result.option[0].A}" onclick="count_marks(${result.option[0].ans},${result.id});radio_disabled(${result.id})"/>&nbsp;${result.option[0].A}</label>
                <label>B) <input type="radio" name="option${result.id}" id="option${result.id}" value="${result.option[1].B}" onclick="count_marks(${result.option[1].ans},${result.id});radio_disabled(${result.id})"/>&nbsp;${result.option[1].B}</label>
                <label>C) <input type="radio" name="option${result.id}" id="option${result.id}" value="${result.option[2].c}" onclick="count_marks(${result.option[2].ans},${result.id});radio_disabled(${result.id})"/>&nbsp;${result.option[2].C}</label>
               <label>D) <input type="radio" name="option${result.id}" id="option${result.id}" value="${result.option[3].D}" onclick="count_marks(${result.option[3].ans},${result.id});radio_disabled(${result.id})"/>&nbsp;${result.option[3].D}</label>
               </div>`;
    displayQuestions.innerHTML = que;
}

function count_marks(marks, i) {
    let flag = false;

    if (dis_count.length === 0) {
        dis_count.push(i);
    } else {
        dis_count.forEach(ques_id => {
            if (ques_id === i) {
                flag = true;
                return false;
            }
        });

        if (flag !== true) {
            dis_count.push(i);
        }
    }
    console.log(marks);
    dis_count.length > 2 ? document.getElementById("btn-result").disabled = false : "";
    marks === 1 ? total_marks = total_marks + 5 : (marks === 0 && total_marks > 0) ? total_marks = total_marks - 5 : total_marks + 0;
}

function show_result() {
    console.log(total_marks);
    reset();
}

function reset() {
    dis_count.forEach((item) => {
        const radio = document.getElementsByName(`option${item}`);
        radio.forEach((q, i) => {
            radio[i].disabled = false;
            radio[i].checked = false;
        });
    });
    min.innerHTML = 02;
    sec.innerHTML = 30;
    total_marks = 0;
    question_no = 0;
    que = '';
    questions_list = [];
    dis_count = [];
    show_question();
    document.getElementById("btn-result").disabled = true;
}

function radio_disabled(i) {
    const radio = document.getElementsByName(`option${i}`);
    // console.log(radio);
    radio.forEach((q, i) => {
        radio[i].disabled = true;
    });
    isQuestionAnswered = true;
}

function time_count() {
    var minutes = min.innerHTML;
    var seconds = sec.innerHTML;

    interval = setInterval(function () {
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
            show_result();
        }
    }, 1000);

}
function display_summary() {
    que_not_visited = questions_list.length;
    queAnswered.innerText = que_answered;
    queMarked.innerText = que_marked;
    queNotAnswered.innerText = que_not_answered;
    queNotVisited.innerText = que_not_visited;
}
show_question();