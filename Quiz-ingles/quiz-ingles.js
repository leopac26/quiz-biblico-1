/*const allQuestions = [
      // Fase 1: 10 perguntas
       {
    question: "1. How do you say 'cachorro' in English? (Como se diz 'cachorro' em inglês?)",
    answers: [
      { text: "a) Dog", correct: true },
      { text: "b) Cat", correct: false },
      { text: "c) Bird", correct: false },
      { text: "d) Fish", correct: false }
    ]},
  
  {
    question: "2. What does 'apple' mean in Portuguese? (O que significa 'apple' em português?)",
    answers: [
      { text: "a) Banana", correct: false },
      { text: "b) Uva", correct: false },
      { text: "c) Maçã", correct: true },
      { text: "d) Laranja", correct: false }
    ]},

  {
    question: "3. Como se diz 'livro' em inglês? (How do you say 'livro' in English?)",
    answers: [
      { text: "a) Book", correct: true },
      { text: "b) Pencil", correct: false },
      { text: "c) School", correct: false },
      { text: "d) Paper", correct: false }
    ]},

  {
    question: "4. O que significa 'car' em português? (What does 'car' mean in Portuguese?)",
    answers: [
      { text: "a) Avião", correct: false },
      { text: "b) Bicicleta", correct: false },
      { text: "c) Carro", correct: true },
      { text: "d) Barco", correct: false }
    ]},
    
  {
    question: "5. How do you say 'muito obrigado' in English? (Como se diz 'muito obrigado' em inglês?)",
    answers: [
      { text: "a) Hello", correct: false },
      { text: "b) Good morning", correct: false },
      { text: "c) Thank you very much", correct: true },
      { text: "d) You're welcome", correct: false }
    ]},

  { 
    question: '6) What color is the sky? (Qual é a cor do céu?)',
  answers: [
    { text: 'Blue', correct: true },
    { text: 'Green', correct: false },
    { text: 'Red', correct: false },
    { text: 'Black', correct: false }
]},

{ 
  question: '7) Como se diz "mesa" em inglês? (How do you say "mesa" in English?)',
  answers: [
    { text: 'Chair', correct: false },
    { text: 'Table', correct: true },
    { text: 'Window', correct: false },
    { text: 'Floor', correct: false }
]},

{ question: '8) Where do you live? (Onde você mora?)',
  answers: [
    { text: 'I live in Brazil.', correct: true },
    { text: 'I am Brazil.', correct: false },
    { text: 'You live in Brazil.', correct: false },
    { text: 'I Brazil live.', correct: false }
]},

{ question: '9) Como se diz "janela" em inglês? (How do you say "janela" in English?)',
  answers: [
    { text: 'Wall', correct: false },
    { text: 'Window', correct: true },
    { text: 'Door', correct: false },
    { text: 'Roof', correct: false }
]},

{ question: '10) How do you say "verde" in English? (como se diz "verde" em ingles?)',
  answers: [
    { text: 'Red', correct: false },
    { text: 'Blue', correct: false },
    { text: 'Yellow', correct: false },
    { text: 'Green', correct: true }
]},

{
  question: '(11) What is the opposite of "big"? (Qual é o oposto de "grande"?)',
  answers: [
    { text: 'a) Small', correct: true },
    { text: 'b) Tall', correct: false },
    { text: 'c) Fat', correct: false },
    { text: 'd) Long', correct: false }
  ]},

{
  question: '(12) Como se diz "escola" em inglês? (How do you say "escola" in English?)',
  answers: [
    { text: 'a) Chair', correct: false },
    { text: 'b) School', correct: true },
    { text: 'c) Office', correct: false },
    { text: 'd) Bookstore', correct: false }
  ]},

  {
  question: '(14) How do you say "maçã" in English? (Como se diz "maçã" em inglês?)',
  answers: [
    { text: 'a) Banana', correct: false },
    { text: 'b) Apple', correct: true },
    { text: 'c) Orange', correct: false },
    { text: 'd) Grape', correct: false }
  ]},

{
  question: '(14) Qual é a tradução de "hello"? (What is the translation of "hello"?)',
  answers: [
    { text: 'a) Olá', correct: true },
    { text: 'b) Tchau', correct: false },
    { text: 'c) Obrigado', correct: false },
    { text: 'd) Por favor', correct: false }
  ]},

{
  question: '(15) How do you say "água" in English? (Como se diz "água" em inglês?)',
  answers: [
    { text: 'a) Fire', correct: false },
    { text: 'b) Milk', correct: false },
    { text: 'c) Water', correct: true },
    { text: 'd) Juice', correct: false }
  ]},

{
  question: '(16) What is the translation of "family"? (Qual é a tradução de "family"?)',
  answers: [
    { text: 'a) Família', correct: true },
    { text: 'b) Festa', correct: false },
    { text: 'c) Fama', correct: false },
    { text: 'd) Folha', correct: false }
  ]},

{
  question: '(20) How do you say "feliz" in English? (Como se diz "feliz" em inglês?)',
  answers: [
    { text: 'a) Sad', correct: false },
    { text: 'b) Happy', correct: true },
    { text: 'c) Angry', correct: false },
    { text: 'd) Tired', correct: false }
  ]},


{ question: '18) Como se diz "meu nome é João" em inglês? (How do you say  in English?)',
  answers: [
    { text: 'a) My name is João.', correct: true },
    { text: 'b) I am João.', correct: false },
    { text: 'c) João is my friend.', correct: false },
    { text: 'd) I call João.', correct: false }
  ]},

{ question: '19) What day is today? (Que dia é hoje?)',
  answers: [
    { text: 'a) It is Monday.', correct: true },
    { text: 'b) It is hot.', correct: false },
    { text: 'c) I go to school.', correct: false },
    { text: 'd) It is night.', correct: false }
  ]},

{ question: '20) Qual é a tradução de "mother"? (What is the translation of "mother"?)',
  answers: [
    { text: 'a) Irmã', correct: false },
    { text: 'b) Tia', correct: false },
    { text: 'c) Mãe', correct: true },
    { text: 'd) Filha', correct: false }
  ]},

{ 
    question: '21) What is your name? (Qual é o seu nome?)',
  answers: [
    { text: 'a) My name is Lucas.', correct: true },
    { text: 'b) I like books.', correct: false },
    { text: 'c) I live in a house.', correct: false },
    { text: 'd) I have a cat.', correct: false }
  ]},
{ question: '22) Como se diz "estou com fome" em inglês? (How do you say "estou com fome" in English?)',
  answers: [
    { text: 'a) I am tired', correct: false },
    { text: 'b) I am hungry', correct: true },
    { text: 'c) I am sad', correct: false },
    { text: 'd) I am late', correct: false }
  ]},
{
  question: '(26) How do you say "amigo" in English? (Como se diz "amigo" em inglês?)',
  answers: [
    { text: 'a) Friend', correct: true },
    { text: 'b) Teacher', correct: false },
    { text: 'c) Family', correct: false },
    { text: 'd) Neighbor', correct: false }
  ]},

{ question: '24) Qual é a tradução de "brother"? (What is the translation of "brother"?)',
  answers: [
    { text: 'a) Primo', correct: false },
    { text: 'b) Irmão', correct: true },
    { text: 'c) Pai', correct: false },
    { text: 'd) Filho', correct: false }
  ]},

{ question: '25) What do you do? (O que você faz?)qual a resposta certa',
  answers: [
    { text: 'a) I am a student.', correct: true },
    { text: 'b) I like pizza.', correct: false },
    { text: 'c) I am tall.', correct: false },
    { text: 'd) I am hungry.', correct: false }
  ]},

{ question: '26) Como se diz "eu tenho um carro" em inglês? (How do you say "eu tenho um carro" in English?)',
  answers: [
    { text: 'a) I drive fast', correct: false },
    { text: 'b) I like cars', correct: false },
    { text: 'c) I have a car', correct: true },
    { text: 'd) I see a car', correct: false }
  ]},

{ question: '27) What is this? (O que é isto?)',
  answers: [
    { text: 'a) It is a pen.', correct: true },
    { text: 'b) I am fine.', correct: false },
    { text: 'c) I like coffee.', correct: false },
    { text: 'd) I live here.', correct: false }
  ]},

{ question: '28) Qual é a tradução de "thank you"? (What is the translation of "thank you"?)',
  answers: [
    { text: 'a) Desculpe', correct: false },
    { text: 'b) De nada', correct: false },
    { text: 'c) Obrigado', correct: true },
    { text: 'd) Olá', correct: false }
  ]},

{ question: '29) How are you? (Como você está?)',
  answers: [
    { text: 'a) I am happy.', correct: true },
    { text: 'b) I am Brazil.', correct: false },
    { text: 'c) I have a pen.', correct: false },
    { text: 'd) I study math.', correct: false }
  ]},

{ question: '30) Como se diz "eu gosto de inglês" em inglês? (How do you say "eu gosto de inglês" in English?)',
  answers: [
    { text: 'a) I speak English.', correct: false },
    { text: 'b) I like English.', correct: true },
    { text: 'c) I read English.', correct: false },
    { text: 'd) I am English.', correct: false }
  ]},

{ question: '31) Where do you live? (Onde você mora?)',
  answers: [
    { text: 'a) I live in Brazil.', correct: true },
    { text: 'b) I work at night.', correct: false },
    { text: 'c) I eat rice.', correct: false },
    { text: 'd) I drink water.', correct: false }
  ]},

{ question: '32) Como se diz "eu estou cansado" em inglês? (How do you say "eu estou cansado" in English?)',
  answers: [
    { text: 'a) I am tall.', correct: false },
    { text: 'b) I am late.', correct: false },
    { text: 'c) I am tired.', correct: true },
    { text: 'd) I am a student.', correct: false }
  ]},

{ question: '33) What time is it? (Que horas são?)',
  answers: [
    { text: 'a) It is 3 o\'clock.', correct: true },
    { text: 'b) I like clocks.', correct: false },
    { text: 'c) I eat lunch.', correct: false },
    { text: 'd) It is sunny.', correct: false }
  ]},

{ question: '34) Qual é a tradução de "cat"? (What is the translation of "cat"?)',
  answers: [
    { text: 'a) Cão', correct: false },
    { text: 'b) Gato', correct: true },
    { text: 'c) Peixe', correct: false },
    { text: 'd) Pássaro', correct: false }
  ]},

{ question: '35) What do you like to eat? (O que você gosta de comer?)',
  answers: [
    { text: 'a) I like pizza.', correct: true },
    { text: 'b) I like red.', correct: false },
    { text: 'c) I am a doctor.', correct: false },
    { text: 'd) I have a car.', correct: false }
  ]},

{ question: '36) Como se diz "ela é minha irmã" em inglês? (How do you say "ela é minha irmã" in English?)',
  answers: [
    { text: 'a) She is my friend.', correct: false },
    { text: 'b) She is my sister.', correct: true },
    { text: 'c) She is my cousin.', correct: false },
    { text: 'd) She is a teacher.', correct: false }
  ]},

{ question: '37) How old are you? (Quantos anos você tem?)',
  answers: [
    { text: 'a) I am 25 years old.', correct: true },
    { text: 'b) I live in a city.', correct: false },
    { text: 'c) I go to school.', correct: false },
    { text: 'd) I have a computer.', correct: false }
  ]},

{ question: '38) Qual é a tradução de "house"? (What is the translation of "house"?)',
  answers: [
    { text: 'a) Janela', correct: false },
    { text: 'b) Porta', correct: false },
    { text: 'c) Casa', correct: true },
    { text: 'd) Cadeira', correct: false }
  ]},

{ question: '39) What do you do on weekends? (O que você faz nos fins de semana?)',
  answers: [
    { text: 'a) I watch movies.', correct: true },
    { text: 'b) I cook every day.', correct: false },
    { text: 'c) I work at school.', correct: false },
    { text: 'd) I eat salad.', correct: false }
  ]},

{ question: '40) Como se diz "ele é médico" em inglês? (How do you say "ele é médico" in English?)',
  answers: [
    { text: 'a) He is a lawyer.', correct: false },
    { text: 'b) He is a doctor.', correct: true },
    { text: 'c) He is a teacher.', correct: false },
    { text: 'd) He is an engineer.', correct: false }
  ]},


{
  question: '41) What is your favorite color? (Qual é a sua cor favorita?)',
  answers: [
    { text: 'a) My favorite color is blue.', correct: true },
    { text: 'b) I live in a big house.', correct: false },
    { text: 'c) I eat fast food.', correct: false },
    { text: 'd) I like animals.', correct: false }
  ]},

{
  question: '42) Como se diz "nós estamos prontos" em inglês? (How do you say "nós estamos prontos" in English?)',
  answers: [
    { text: 'a) We are late.', correct: false },
    { text: 'b) We are ready.', correct: true },
    { text: 'c) We are lost.', correct: false },
    { text: 'd) We are tired.', correct: false }
  ]},

{
  question: '43) What do you do? (O que você faz?)',
  answers: [
    { text: 'a) I am a teacher.', correct: true },
    { text: 'b) I am from Canada.', correct: false },
    { text: 'c) I like apples.', correct: false },
    { text: 'd) I speak French.', correct: false }
  ]},

{
  question: '44) Qual é a tradução de "window"? (What is the translation of "window"?)',
  answers: [
    { text: 'a) Cadeira', correct: false },
    { text: 'b) Porta', correct: false },
    { text: 'c) Janela', correct: true },
    { text: 'd) Mesa', correct: false }
  ]},

{
  question: '45) Where are you from? (De onde você é?)',
  answers: [
    { text: 'a) I am from Brazil.', correct: true },
    { text: 'b) I am a student.', correct: false },
    { text: 'c) I like soccer.', correct: false },
    { text: 'd) I have a dog.', correct: false }
  ]},

{
  question: '46) Como se diz "eu estou com fome" em inglês? (How do you say "eu estou com fome" in English?)',
  answers: [
    { text: 'a) I am sad.', correct: false },
    { text: 'b) I am hungry.', correct: true },
    { text: 'c) I am sleepy.', correct: false },
    { text: 'd) I am cold.', correct: false }
  ]},

{
  question: '47) What is this? (O que é isso?)',
  answers: [
    { text: 'a) It is a pen.', correct: true },
    { text: 'b) I am fine.', correct: false },
    { text: 'c) She is happy.', correct: false },
    { text: 'd) They are here.', correct: false }
  ]},

{
  question: '48) Qual é a tradução de "plane"? (What is the translation of "plane"?)',
  answers: [
    { text: 'a) Bicicleta', correct: false },
    { text: 'b) Avião', correct: true },
    { text: 'c) Carro', correct: false },
    { text: 'd) Barco', correct: false }
  ]},

{
  question: '49) What day is today? (Que dia é hoje?)',
  answers: [
    { text: 'a) Today is Monday.', correct: true },
    { text: 'b) It is sunny.', correct: false },
    { text: 'c) I go to school.', correct: false },
    { text: 'd) It is hot.', correct: false }
  ]},

{
  question: '50) Como se diz "eles são meus amigos" em inglês? (How do you say "eles são meus amigos" in English?)',
  answers: [
    { text: 'a) They are my parents.', correct: false },
    { text: 'b) They are my brothers.', correct: false },
    { text: 'c) They are my friends.', correct: true },
    { text: 'd) They are my teachers.', correct: false }
  ]},

{
  question: '51) What time is it? (Que horas são?)',
  answers: [
    { text: 'a) It is ten o\'clock.', correct: true },
    { text: 'b) I am working.', correct: false },
    { text: 'c) It is raining.', correct: false },
    { text: 'd) I am studying.', correct: false }
  ]},

{
  question: '52) como se diz "livro" em inglês? (What is the translation of "livro"?)',
  answers: [
    { text: 'a) Book', correct: true },
    { text: 'b) Table', correct: false },
    { text: 'c) Pen', correct: false },
    { text: 'd) Chair', correct: false }
  ]},

{
  question: '53) How are you today? (Como você está hoje?)',
  answers: [
    { text: 'a) I am fine.', correct: true },
    { text: 'b) I am hungry.', correct: false },
    { text: 'c) I am from Brazil.', correct: false },
    { text: 'd) I like pizza.', correct: false }
  ]},

{
  question: '54) Como se diz "Eu não entendo" em inglês? (How do you say "Eu não entendo" in English?)',
  answers: [
    { text: 'a) I don\'t understand.', correct: true },
    { text: 'b) I am fine.', correct: false },
    { text: 'c) I am happy.', correct: false },
    { text: 'd) I am tired.', correct: false }
  ]},

{
  question: '55) What is your favorite food? (Qual é a sua comida favorita?)',
  answers: [
    { text: 'a) My favorite food is pizza.', correct: true },
    { text: 'b) I have a dog.', correct: false },
    { text: 'c) I go to school.', correct: false },
    { text: 'd) I like music.', correct: false }
  ]},

{
  question: '56) como se diz "escola" em ingles? (What is the translation of "escola"?)',
  answers: [
    { text: 'a) School', correct: true },
    { text: 'b) Hospital', correct: false },
    { text: 'c) Library', correct: false },
    { text: 'd) Park', correct: false }
  ]},

{
  question: '57) How old are you? (Quantos anos você tem?)',
  answers: [
    { text: 'a) I am twenty years old.', correct: true },
    { text: 'b) I am from New York.', correct: false },
    { text: 'c) I like to play soccer.', correct: false },
    { text: 'd) I am studying English.', correct: false }
  ]},

{
  question: '58) Como se diz "Eu gosto de ler" em inglês? (How do you say "Eu gosto de ler" in English?)',
  answers: [
    { text: 'a) I like to read.', correct: true },
    { text: 'b) I am tired.', correct: false },
    { text: 'c) I am learning.', correct: false },
    { text: 'd) I eat pizza.', correct: false }
  ]},

{
  question: '59) What is the weather like today? (Como está o tempo hoje?)',
  answers: [
    { text: 'a) It is sunny today.', correct: true },
    { text: 'b) I am watching TV.', correct: false },
    { text: 'c) I am at home.', correct: false },
    { text: 'd) I like swimming.', correct: false }
  ]},

{
  question: '60) Qual é a tradução de "peixe"? (What is the translation of "peixe"?)',
  answers: [
    { text: 'a) shark', correct: false },
    { text: 'b) Bird', correct: false },
    { text: 'c) Cat', correct: false },
    { text: 'd) Fish', correct: true }
  ]}
       ]

    let phaseLimits = [10, 30, 60];
    let currentPhase = 1;
    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let timePerQuestion = 60; // segundos
    let timeLeft = timePerQuestion;
    let timerInterval;


    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const nextBtn = document.getElementById("next-btn");
    const resultEl = document.getElementById("result");
    const restartBtn = document.getElementById("restart-btn");
    const phaseInfo = document.getElementById("phase-info");
    const nextPhaseBtn = document.getElementById("next-phase-btn");

    function startPhase(phase) {
      phaseInfo.textContent = `Fase ${phase}`;
      currentPhase = phase;
      const start = phase === 1 ? 0 : phaseLimits[phase - 2];
      const end = phaseLimits[phase - 1];
      currentQuestions = allQuestions.slice(start, end);
      shuffleArray(currentQuestions);
      currentIndex = 0;
      score = 0;
      resultEl.classList.add("hidden");
      nextBtn.classList.add("hidden");
      restartBtn.classList.add("hidden");
      nextPhaseBtn.classList.add("hidden");
      showQuestion();
    }

    function showQuestion() {
      const question = currentQuestions[currentIndex];
      questionEl.textContent = question.question;
      answersEl.innerHTML = "";
      question.answers.forEach((ans, i) => {
        const btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.onclick = () => handleAnswer(ans.correct);
        answersEl.appendChild(btn);
        
      });
      startTimer();
    }

    function handleAnswer(correct) {
      if (correct) score++;
      nextBtn.classList.remove("hidden");
      Array.from(answersEl.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQuestions[currentIndex].answers.find(a => a.correct).text) {
          btn.style.background = "#c8e6c9";
        } else {
          btn.style.background = "#ffcdd2";
        }
      });
    }

    nextBtn.onclick = () => {
      currentIndex++;
      if (currentIndex < currentQuestions.length) {
        nextBtn.classList.add("hidden");
        clearInterval(timerInterval);
        showQuestion();
      } else {
        finishPhase();
      }
    };

    function finishPhase() {
      clearInterval(timerInterval);
      questionEl.textContent = "";
      answersEl.innerHTML = "";
      nextBtn.classList.add("hidden");

      const total = currentQuestions.length;
      const percent = (score / total) * 100;
      if (percent >= 60) {
        resultEl.innerHTML = `<p>✅ Parabéns! Você acertou ${score} de ${total} perguntas.</p>`;
        if (currentPhase < 3) {
          nextPhaseBtn.classList.remove("hidden");
        } else {
          resultEl.innerHTML += "<p>🎉 Fim do quiz! Você completou todas as fases.</p>";
          restartBtn.classList.remove("hidden");
        }
      } else {
        resultEl.innerHTML = `<p>❌ Você acertou ${score} de ${total}. Tente novamente!</p>`;
        restartBtn.classList.remove("hidden");
      }

      resultEl.classList.remove("hidden");
    }

    nextPhaseBtn.onclick = () => startPhase(currentPhase + 1);
    restartBtn.onclick = () => startPhase(1);

    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    function startTimer() {
  clearInterval(timerInterval);
  timeLeft = timePerQuestion;
  updateTimerBar();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerBar();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleAnswer(false); // tempo esgotado = resposta errada
    }
  }, 1000);
}

function updateTimerBar() {
  const bar = document.getElementById("timer-bar");
  const percent = (timeLeft / timePerQuestion) * 100;
  bar.style.width = percent + "%";
  bar.style.background = percent <= 30 ? "#f44336" : "#4caf50";
}


    // Início do jogo
    startPhase(1);*/