var random_question_no = 0;//random_question_id
var questionDetails_Div = document.getElementById('question_details');
const min = document.getElementById("min");
const sec = document.getElementById("sec");
var que = '';
var total_marks = 0;
var duplicate_question = [];//questions
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
        random_question_no = Math.floor(Math.random() * 11);

        if (random_question_no === 0) {
            flag = 1;
        } else {
            if (duplicate_question.length === 0) {
                flag = 0;
            } else {
                duplicate_question.forEach(item => {
                    if (item == random_question_no) {
                        flag = 1;
                        return false;
                    }
                });
            }
        }

        flag == 1 ? i = i - 1 : duplicate_question.push(random_question_no);
    }
    //console.log(duplicate_question);
    show_tips();
    duplicate_question.forEach((item, index) => {
        select_question(item, index + 1);
    });
}

function show_tips() {
    var display_note = "";
    note.forEach(note => {
        display_note = display_note + `<li>${note}</li>`;
    });
    display_note = `<ul> ${display_note}</ul>`

    //console.log(display_note);
    document.getElementsByClassName('show_note')[0].innerHTML = display_note;
    console.log(document.getElementsByClassName('show_note'));
}

function select_question(selected_question_no, index) {
    question_details.forEach((q) => {
        q.id === selected_question_no ? display_questions(q, index) : '';
    });
}

function display_questions(questions, i) {
    que = que + `<p id="question">${i}.${questions.question}</p>
                <div id="radio_option">
                <label>A)</label> <input type="radio" name="option${questions.id}" id="${questions.id}" value="${questions.option[0].A}" onclick="count_marks(${questions.option[0].ans},${questions.id});radio_disabled(${questions.id})"/>${questions.option[0].A}
                <label>B)</label> <input type="radio" name="option${questions.id}" id="${questions.id}" value="${questions.option[1].B}" onclick="count_marks(${questions.option[1].ans},${questions.id});radio_disabled(${questions.id})"/>${questions.option[1].B}<br>
                <label>C)</label> <input type="radio" name="option${questions.id}" id="${questions.id}" value="${questions.option[2].c}" onclick="count_marks(${questions.option[2].ans},${questions.id});radio_disabled(${questions.id})"/>${questions.option[2].C}
                <label>D)</label> <input type="radio" name="option${questions.id}" id="${questions.id}" value="${questions.option[3].D}" onclick="count_marks(${questions.option[3].ans},${questions.id});radio_disabled(${questions.id})"/>${questions.option[3].D}</div>`;
    questionDetails_Div.innerHTML = `${que}<br> <button type="button" onclick="show_result()" id="btn_result" disabled>Result</button><button type="button" onclick="reset()">Reset</button>`;
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
    dis_count.length > 2 ? document.getElementById("btn_result").disabled = false : "";
    marks === 1 ? total_marks = total_marks + 5 : (marks === 0 && total_marks > 0) ? total_marks = total_marks - 5 : total_marks + 0;
    //console.log(dis_count.length);
}

function show_result() {
    console.log(total_marks);
    min.innerHTML = 02;
    sec.innerHTML = 30;
    total_marks = 0;
    que = '';
    duplicate_question = [];
    dis_count = [];
    show_question();
    reset();
    time_count();
}

function reset() {
    //console.log(dis_count);
    dis_count.forEach((item) => {
        const radio = document.getElementsByName(`option${item}`);
        radio.forEach((q, i) => {
            radio[i].disabled = false;
            radio[i].checked = false;
            //checked
        });
    });
    document.getElementById("btn_result").disabled = true;
}

function radio_disabled(i) {
    const radio = document.getElementsByName(`option${i}`);
    radio.forEach((q, i) => {
        radio[i].disabled = true;
    });
}

function time_count() {
    const questionDetails = document.getElementById("question_details").offsetHeight;

    document.getElementById("tip_details").style.height = questionDetails + "px";
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
        // console.log(minutes+" "+seconds)
    }, 1000);

}
show_question();
time_count();