const options = document.querySelector(".options").children;
const question = document.querySelector(".question");
const questionNumberSpan = document.querySelector(".question-num-value");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const totalQuestionSpan = document.querySelector(".total-question");
const answerTrackerContainer = document.querySelector(".answers-tracker");
const comment = document.querySelector(".comment");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
const timer = document.querySelector(".setTime");
var prevBtn = document.getElementById(`btn2`);
var nextBtn = document.getElementById(`btn1`);
let currentQuestion = 0;
let questionIndex;  //the number of each question, if u typed questionIndex = 1 then it will pop-out the second question
let index = 0;
let myArray=[];
let myArr=[];
let score = 0;
var time = 10;
const start = document.getElementById(`start`);



// questions, options and answers
const questions = [
  {
    q: `What is my third name?`,
    options: [`Fuskydon`, `Opeyemi`, `Oladipupo`, `Owolabi`],
    answer: 1
  },
  {
    q: `Whats my favorite food?`,
    options: [`Amala`, `Iyan`, `Eba`, `Fufu`],
    answer: 1
  },
  {
    q: `If at all i want to marry, who will i wish to marry?`,
    options: [`Ayomide`, `Aishat`, `Aish`, `Maryam`],
    answer: 2
  },
  {
    q: `Whats the name of my favorite club?`,
    options: [`Chelsea FC`, `Barcelona`, `Manchester City`, `Bayern Munich`],
    answer: 0
  },
  {
    q: `Who did i love most on earth?`,
    options: [`My friends`, `My Siblings`, `My Parent`, `My Clerics`],
    answer: 2
  }
]

// set questions, options and option numbers

// this function load the questions and options together
function load() {
  //where question number start from, it will be adding itself till it reach the last one
  questionNumberSpan.innerHTML = index + 1;
  //the last question is set to questions.length
  totalQuestionSpan.innerHTML = questions.length;
  question.innerHTML = questions[questionIndex].q;  // this set d question
  // this is where it was assigned that option 1 = 0 i.e a
  // option 2 = 1 i.e b and so on
  op1.innerHTML = questions[questionIndex].options[0];
  op2.innerHTML = questions[questionIndex].options[1];
  op3.innerHTML = questions[questionIndex].options[2];
  op4.innerHTML = questions[questionIndex].options[3];
  index++; //continuation of adding question num
}

// this time is updated once the startQuiz function is clicked
// thats where its update is
// clicking on start before quiz comence
start.addEventListener(`click`, startQuiz);
start.addEventListener(`mousemove`, runEvent);

function runEvent(e){
  console.log(`EVENT TYPE: `+e.type);
  document.body.style.backgroundColor = "rgba("+e.offsetX+", "+e.offsetY+", 100, 90)";
}

function startQuiz(){
  start.style.display = "none";
  quiz.style.display = "block";
  update = setInterval("timeQuiz()", 10000);
}


// for next button

// for next, the click event have been added to it at the HTML code
function next() {
  validate();
}

// function executing next and previous question
function validate() {
  if(!options[0].classList.contains("disabled")){
    alert("Please kindly select an option");
  }
  else {
    randomQuestion();
    enableOptions();
  }
}

/*
//to show prev button
prevBtn = document.getElementById(`btn2`);
nextBtn = document.getElementById(`btn1`);
// for previous question
prevBtn.addEventListener(`click`, previous);

//creating previousBtn function
function previous() {
  nextBtn.disabled = false;
  questions[currentQuestion].remove(load());
  currentQuestion--;
  
  //this below codes shows that after removing an image then it turn it to active 
  
  questions[currentQuestion].add(load());
  
  // this tell us that if it is at the first image then the previous button shouldnt function again
  if (currentQuestion === 0) {
    prevBtn.disabled = true;
  }
};
*/


// //for random questions
function randomQuestion() {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = 0;
  if(index==questions.length) {
    quizOver();
  }
  else {
    if(myArray.length > 0) {
      for(let i = 0; i < myArray.length; i++) {
        // this line is telling it that if any duplicate question is found then break
         if(myArray[i]==randomNumber) {
           hitDuplicate = 1;
           break;
         }
      }
      if(hitDuplicate == 1) {
        randomQuestion();
      }
      else {
        questionIndex = randomNumber;
        load();
        myArr.push(questionIndex);
      }
    }
    if(myArray.length == 0) {
      questionIndex = randomNumber;
      load();
      myArr.push(questionIndex);
    }
    console.log("myArr:" + myArr);
  myArray.push(questionIndex);
 }
}

//creating quizover function to show on screen
function  quizOver() {
  /*
  // for timing, tghough i disabled the timeQuiz1 function underneath
  //window.clearInterval(update);
  */
  // this is where the show which was added at the css file have occured
   document.querySelector(".quiz-over").classList.add("show");
   correctAnswerSpan.innerHTML = score;
   totalQuestionSpan2.innerHTML = questions.length;
   percentage.innerHTML = (score/questions.length) * 100 + "%";
   if(score <= 2) {
     comment.textContent=`Good try but not that impressive`;
   } else {
     comment.textContent=`Wow, very impressive, you have a very good future ahead`
   }
};

//by clicking on try again, this automatically reload the page
function tryAgain() {
  window.location.reload();
}

// this function when u clicked on the option 
// to check whether the answers are correct or wrong
function check(element) {
  //this line is telling us that did it tally with the answer array we put down in our questions?
  if(element.id == questions[questionIndex].answer) {
    element.classList.add("correct"); //this is adding this css to this line (.answers-tracker div.correct)
    updateAnswerTracker("correct");
    score++;
    console.log("score: "+score)
  }
  else {
    element.classList.add("wrong"); // this is adding this css to this line (.answers-tracker div.wrong)
    updateAnswerTracker("wrong");
  }
  disabledOptions();
}

//this is for the next button, so that it will enable the options choosing when it get to the next question
function enableOptions() {
  for(let i = 0; i < options.length; i++) {
    options[i].classList.remove("disabled", "correct", "wrong");
  }
}

//to disable the rest of the option after picking one
function disabledOptions() {
  for(let i = 0; i < options.length; i++) {
    options[i].classList.add("disabled")
    //if you choose the wrong option and u want it to indicate the correct one then
    if(options[i].id == questions[questionIndex].answer) {
      options[i].classList.add("correct")
    }
  }
}

// for answer tracker
function answerTracker() {
  for(let i = 0; i < questions.length; i++) {
    const div = document.createElement("div")  // this is what is in our CSS file (.answerTracker div)
    answerTrackerContainer.appendChild(div);
  }
}

function updateAnswerTracker(classNam) {
  answerTrackerContainer.children[index-1].classList.add(classNam);
}

/*
set time fotr all the questions together
// setting quiz time
function timeQuiz1() {
  time = time - 1;
  if(time < 20) {
    timer.innerHTML = time;
  }
  if(time < 1) {
    window.clearInterval(update);
    quizOver();
  }
}
update = setInterval("timeQuiz()", 1000);
*/

//setting time for each question
function timeQuiz() {
  time = time - 1;
  if(time < 10) {
    randomQuestion();
    enableOptions();
  };
};


window.onload = function() {
  randomQuestion();
  answerTracker();
}