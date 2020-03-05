const STORE = {
    quizProgress: 1,
    score: 0,
    questions: {
        1: {
            id: 1,
            question: 'A group of cats is called:',
            choices: [
                'a batch',
                'trouble',
                'a gang',
                'a clowder',
            ],
            answer: 'a clowder',
        },
        2: {
            id: 2,
            question: 'The dictionary term for a lover of cats is:',
            choices: [
                'a Crazy Cat Person',
                'an Ailurophile',
                'a Cataholic',
                'a Feline Fanatic',
            ],
            answer: 'an Ailurophile',
        },
        3: {
            id: 3,
            question: 'The tufts of hair that grow inside and around a cat\'s ear are called:',
            choices: [
                'ear furnishings',
                'wax collectors',
                'dust bunnies',
                'noise whiskers',
            ],
            answer: 'ear furnishings',
        },
        4: {
            id: 4,
            question: 'A cat\'s strongest sense is:',
            choices: [
                'sight',
                'hearing',
                'taste',
                'touch',
            ],
            answer: 'hearing',
        },
        5: {
            id: 5,
            question: 'Cats use their ____ to detect if they can fit through a space:',
            choices: [
                'paws',
                'ears',
                'whiskers',
                'tail',
            ],
            answer: 'whiskers',
        },
        6: {
            id: 6,
            question: 'The technical term for a cat\'s hairball is:',
            choices: [
                'trichobezoar',
                'gross',
                'hair missile',
                'constipation',
            ],
            answer: 'trichobezoar',
        },
        7: {
            id: 7,
            question: 'Cats are unable to taste:',
            choices: [
                'spice',
                'salt',
                'sweet',
                'sour',
            ],
            answer: 'sweet',
        },
        8: {
            id: 8,
            question: 'Cats sweat through their:',
            choices: [
                'nose',
                'paws',
                'ears',
                'tail',
            ],
            answer: 'paws',
        },
        9: {
            id: 9,
            question: 'The Egyptian goddess of cats name is:',
            choices: [
                'Horus',
                'Chloe',
                'Mittens',
                'Bastet',
            ],
            answer: 'Bastet',
        },
        10: {
            id: 10,
            question: 'A house cat is genetically 95.6%:',
            choices: [
                'apathetic',
                'lion',
                'tiger',
                'leopard',
            ],
            answer: 'tiger',
        },
    }
};

//start the quiz
function quizStart(){
    $(".quiz-content").on('click','.start-quiz-button',function(event){
        event.preventDefault();
        resetQuizProgress();
        displayQuizQuestion();
    });
}

//reset stored progress/score values
function resetQuizProgress(){
    STORE.quizProgress = 1;
    STORE.score = 0;
}

//submit quiz answer
function submitQuizAnswer(){

    $('.quiz-content').on('submit','#quiz-form',function(event){
        event.preventDefault();
        checkQuizAnswer();
    });
}

//check quiz answer and notify quiz taker of result
function checkQuizAnswer(){
    let answer = $("input[name='quiz_answer']:checked").val();
    let currentQuestion = STORE.questions[STORE.quizProgress];

    if( answer === currentQuestion.answer){
        handleCorrectAnswer();
    }else{
        handleWrongAnswer();
    }
}

//display correct answer message and update score
function handleCorrectAnswer(){
    //update score
    STORE.score += 1;
    $(".quiz-score").html(STORE.score);
    displayNextButton();

    $("#quiz-results").html('<img src="imgs/answer_correct.jpg" title="Happy Cat" alt="Happy Cat">Purrrfect! <br>That is the correct answer!');
    $("#quiz-results").addClass('correct');
}

//display wrong answer message
function handleWrongAnswer(){
    let currentQuestion = STORE.questions[STORE.quizProgress];

    displayNextButton();

    $("#quiz-results").html(`<img src="imgs/answer_incorrect.jpg" title="Sad Cat" alt="Sad Cat">D\'oh! The correct answer is:<br>${currentQuestion.answer}`);
    $("#quiz-results").addClass('incorrect');
}

//replace submit button with next button
function displayNextButton(){
    let currentQuestion = STORE.questions[STORE.quizProgress];
    if(currentQuestion.id === 10){
        $("#quiz-button").html('<button type="button" class="quiz-finish-button">Next</button>');
    }else{
        $("#quiz-button").html('<button type="button" class="quiz-next-button">Next</button>');
    }
}

//update progress and score
function incrementQuizProgress(){
    STORE.quizProgress += 1;
}

//load next question
function nextQuizQuestion(){
    $(".quiz-content").on('click','.quiz-next-button',function(event){
        event.preventDefault();
        incrementQuizProgress();
        displayQuizQuestion();
    });
}

//display quiz start page
function displayQuizStartPage(){
    displayTitleOnlyHeader();
    $(".quiz-content").html(`
    <img src="imgs/quiz_start.jpg" alt="Thoughtful tabby resting its chin on a table" title="Thoughtful Tabby" class="quiz-splash-image">
    <h2>Put your feline IQ to the test!</h2>
    <button type="button" class="start-quiz-button">Start Quiz</button>
    `);
}

//display quiz question
function displayQuizQuestion(){
    $(".quiz-header").html(`
        <img src="imgs/quiz_header.png" class="quiz-thumbnail" alt="Cat resting its chin on its paw thoughtfully" title="Thinking Cat">
        <div class="quiz-details">
            <h1>Cat Facts Quiz</h1>
            <ul>
                <li><b>Question:</b> <span class="quiz-progress">${STORE.quizProgress}</span>/10 </li>
                <li><b>Score:</b> <span class="quiz-score">${STORE.score}</span></h2></li>
            </ul>
        </div>
    `);

    let currentQuestion = STORE.questions[STORE.quizProgress];
    let currentOptions = formatQuizOptions(currentQuestion.choices);

    $(".quiz-content").html(`
        <form id="quiz-form" name="quiz-question-form">
            <fieldset>
                <legend>${currentQuestion.question}</legend>
                ${currentOptions}
            </fieldset>
            <div class="quiz-submit">
                <div id="quiz-results" class="quiz-results"></div>
                <div id="quiz-button"><button type="submit" class="quiz-submit-button">Submit</button></div>
            </div>
        </form>
    `);
}

function formatQuizOptions(choices){
    let answerHTML = '';
    
    choices.forEach(function(value,index){
        answerHTML +=`<label for="quiz_answer_${index}">
        <input type="radio" id="quiz_answer_${index}" name="quiz_answer" value="${value}" required> ${value}
        </label>`;
    });

    return answerHTML;
}

//display quiz results page
function displayQuizResults(){
    $(".quiz-content").on('click','.quiz-finish-button',function(event){
        event.preventDefault();

        displayTitleOnlyHeader();
        $(".quiz-content").html(`
        <img src="imgs/quiz_results.jpg" alt="Playful tabby looking at you upside down" title="Playful Tabby" class="quiz-splash-image">
        <h2>Your Cat IQ Score is:<br>${STORE.score} / 10</h2>
        <button type="button" class="start-quiz-button">Restart Quiz</button>
        `);
    });
}

function displayTitleOnlyHeader(){
    $(".quiz-header").html(`<h1>Cat Facts Quiz</h1>`);
}

//quiz initiation function
function initiateQuiz(){
    resetQuizProgress();
    displayQuizStartPage();
    quizStart();
    submitQuizAnswer();
    nextQuizQuestion();
    displayQuizResults();
}

$(initiateQuiz);