let timeleft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextbtn = document.getElementById("next-button");
let countofQ = document.querySelector(".question-number");
let displayCont = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startSc = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scorecount = 0;
let count = 11;
let countdown;

//Questions and options

const quizArr = [
  {
    id: "0",
    question: "Which is the most widely spoken language in the world?",
    options: ["Spanish", "Hindi", "English", "Mandarin"],
    correct: "Mandarin",
  },
  {
    id: "1",
    question: "Which is the only continent in the world without a desert?",
    options: ["North America", "Asia", "Africa", "Europe"],
    correct: "Europe",
  },
  {
    id: "2",
    question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    correct: "Charles Babbage",
  },
  {
    id: "3",
    question:
      "What do you call a computer on a network that requests files from another computer?",
    options: ["A client", "A host", "A router", "A web server"],
    correct: "A client",
  },
  {
    id: "4",
    question:
      "Hardware devices that are not part of the main computer system and are often added later to the system.",
    options: ["Peripheral", "Clip art", "Highlight", "Execute"],
    correct: "Peripheral",
  },
  {
    id: "5",
    question:
      "The main computer that stores the files that can be sent to computers that are networked together is:",
    options: ["Clip art", "Mother board", "Peripheral", "File server"],
    correct: "File server",
  },
  {
    id: "6",
    question: "How can you catch a computer virus?",
    options: [
      "Sending e-mail messages",
      "Using a laptop during the winter",
      "Opening e-mail attachments",
      "Shopping on-line",
    ],
    correct: "Opening e-mail attachments",
  },
  {
    id: "7",
    question: "Google (www.google.com) is a:",
    options: [
      "Search Engine",
      "Number in Math",
      "Directory of images",
      "Chat service on the web",
    ],
    correct: "Search Engine",
  },
  {
    id: "8",
    question: "Which is not an Internet protocol?",
    options: ["HTTP", "FTP", "STP", "IP"],
    correct: "STP",
  },
  {
    id: "9",
    question: "Which of the following is not a valid domain name?",
    options: [
      "www.yahoo.com",
      "www.yahoo.co.uk",
      "www.com.yahoo",
      "www.yahoo.co.in",
    ],
    correct: "www.com.yahoo",
  },
];

//Restart quiz

restart.addEventListener("click", () => {
  initial();
  displayCont.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button

nextbtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount++;
    if (questionCount == quizArr.length) {
      displayCont.classList.add("hide");
      scoreContainer.classList.remove("hide");

      userScore.innerHTML =
        "Your score is " + scorecount + " out of " + questionCount;
    } else {
      countofQ.innerHTML =
        questionCount + 1 + " of " + quizArr.length + " Questions";
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer

const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeleft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//quiz display

const quizDisplay = (questionCount) => {
  let quizcards = document.querySelectorAll(".container-mid");
  //hide all other cards
  quizcards.forEach((card) => {
    card.classList.add("hide");
  });
  quizcards[questionCount].classList.remove("hide");
};

//Creating the quiz

function quizcreator() {
  quizArr.sort(() => Math.random() - 0.5);

  for (let i of quizArr) {
    i.options.sort(() => Math.random() - 0.5);

    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    //question number
    countofQ.innerHTML = 1 + " of " + quizArr.length + " Question";

    //question

    let questionDiv = document.createElement("p");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = i.question;
    div.appendChild(questionDiv);

    //options
    div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
         <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
          <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
           <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
    quizContainer.appendChild(div);
  }
}

//Checker function to check if selected option is correct
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");
  //if user clicked answer == correct option stored in object
  if (userSolution === quizArr[questionCount].correct) {
    userOption.classList.add("correct");
    scorecount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArr[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scorecount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizcreator();
  quizDisplay(questionCount);
}

//when start button is clicked
startButton.addEventListener("click", () => {
  startSc.classList.add("hide");
  displayCont.classList.remove("hide");
  initial();
});

//hide quiz and display screen when site is loaded
window.onload = () => {
  startSc.classList.remove("hide");
  displayCont.classList.add("hide");
};
