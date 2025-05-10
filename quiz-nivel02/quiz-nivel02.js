const allQuestions = [
      // Fase 1: 10 perguntas
      {
    question: "(1) A quem Paulo chamou de 'meu companheiro de lutas' (Filemon 1:2)?",
    answers: [
      { text: "Apolo", correct: false },
      { text: "Afia", correct: false },
      { text: "Arquipo", correct: true },
      { text: "Adonias", correct: false }
    ]
  },
  {
    question: "(2) Qual o nome do profeta que teve uma visão de um vale de ossos secos?",
    answers: [
      { text: "Isaías", correct: false },
      { text: "Jeremias", correct: false },
      { text: "Ezequiel", correct: true },
      { text: "Daniel", correct: false }
    ]
  },
  {
    question: "(3) Quem foi o rei que viu a escrita na parede durante um banquete?",
    answers: [
      { text: "Nabucodonosor", correct: false },
      { text: "Belsazar", correct: true },
      { text: "Dario", correct: false },
      { text: "Ciro", correct: false }
    ]
  },
  {
    question: "(4) Qual é o menor versículo da Bíblia?",
    answers: [
      { text: "João 11:35", correct: true },
      { text: "1 Tessalonicenses 5:16", correct: false },
      { text: "Êxodo 20:13", correct: false },
      { text: "Lucas 20:30", correct: false }
    ]
  },
  {
    question: "(5) Quem foi o profeta que desafiou os profetas de Baal no Monte Carmelo?",
    answers: [
      { text: "Elias", correct: true },
      { text: "Eliseu", correct: false },
      { text: "Moisés", correct: false },
      { text: "Samuel", correct: false }
    ]
  },
  {
    question: "(6) Qual apóstolo teve uma visão de um lençol descendo do céu com animais?",
    answers: [
      { text: "João", correct: false },
      { text: "Tiago", correct: false },
      { text: "Pedro", correct: true },
      { text: "Paulo", correct: false }
    ]
  },
  {
    question: "(7) Quem foi lançado na cova dos leões por continuar orando a Deus?",
    answers: [
      { text: "Daniel", correct: true },
      { text: "Ezequiel", correct: false },
      { text: "Jeremias", correct: false },
      { text: "José", correct: false }
    ]
  },
  {
    question: "(8) Qual foi o primeiro milagre de Jesus registrado na Bíblia?",
    answers: [
      { text: "Curar um cego", correct: false },
      { text: "Transformar água em vinho", correct: true },
      { text: "Multiplicar pães e peixes", correct: false },
      { text: "Andar sobre as águas", correct: false }
    ]
  },
  {
    question: "(9) Quem traiu Jesus por trinta moedas de prata?",
    answers: [
      { text: "Pedro", correct: false },
      { text: "Judas Iscariotes", correct: true },
      { text: "Tomé", correct: false },
      { text: "André", correct: false }
    ]
  },
  {
    question: "(10) Qual livro da Bíblia contém o capítulo conhecido como 'o capítulo do amor'?",
    answers: [
      { text: "Romanos", correct: false },
      { text: "1 Coríntios", correct: true },
      { text: "Efésios", correct: false },
      { text: "Gálatas", correct: false }
    ]
  },
  {
    question: "(11) Quem foi o homem mais velho mencionado na Bíblia?",
    answers: [
      { text: "Noé", correct: false },
      { text: "Matusalém", correct: true },
      { text: "Adão", correct: false },
      { text: "Abraão", correct: false }
    ]
  },
  {
    question: "(12) Qual era o nome da esposa de Abraão?",
    answers: [
      { text: "Rebeca", correct: false },
      { text: "Sara", correct: true },
      { text: "Raquel", correct: false },
      { text: "Lia", correct: false }
    ]
  },
  {
    question: "(13) Quem interpretou o sonho de Faraó sobre sete vacas gordas e sete magras?",
    answers: [
      { text: "Moisés", correct: false },
      { text: "José", correct: true },
      { text: "Daniel", correct: false },
      { text: "Arão", correct: false }
    ]
  },
  {
    question: "(14) Qual discípulo andou sobre as águas em direção a Jesus?",
    answers: [
      { text: "João", correct: false },
      { text: "Pedro", correct: true },
      { text: "Tiago", correct: false },
      { text: "Tomé", correct: false }
    ]
  },
  {
    question: "(15) Quem escreveu a maioria dos Salmos?",
    answers: [
      { text: "Salomão", correct: false },
      { text: "Davi", correct: true },
      { text: "Moisés", correct: false },
      { text: "Asafe", correct: false }
    ]
  },
  {
    question: "(16) Qual é o último livro do Antigo Testamento?",
    answers: [
      { text: "Zacarias", correct: false },
      { text: "Malaquias", correct: true },
      { text: "Ageu", correct: false },
      { text: "Naum", correct: false }
    ]
  },
  {
    question: "(17) Quem foi a primeira mulher criada por Deus?",
    answers: [
      { text: "Eva", correct: true },
      { text: "Sara", correct: false },
      { text: "Miriam", correct: false },
      { text: "Raquel", correct: false }
    ]
  },
  {
    question: "(18) Qual era a profissão de Mateus antes de seguir Jesus?",
    answers: [
      { text: "Pescador", correct: false },
      { text: "Cobrador de impostos", correct: true },
      { text: "Carpinteiro", correct: false },
      { text: "Pastor", correct: false }
    ]
  },
  {
    question: "(19) Quem foi ressuscitado por Jesus após quatro dias morto?",
    answers: [
      { text: "Lázaro", correct: true },
      { text: "Jairo", correct: false },
      { text: "Eutico", correct: false },
      { text: "Tabita", correct: false }
    ]
  },
  {
    question: "(20) Qual apóstolo é conhecido por duvidar da ressurreição de Jesus até vê-lo?",
    answers: [
      { text: "Pedro", correct: false },
      { text: "Tomé", correct: true },
      { text: "João", correct: false },
      { text: "Tiago", correct: false }
    ]
  },
  {
    question: "(21) Quem foi o primeiro rei de Israel?",
    answers: [
      { text: "Davi", correct: false },
      { text: "Saul", correct: true },
      { text: "Salomão", correct: false },
      { text: "Samuel", correct: false }
    ]
  },
  {
    question: "(22) Qual profeta foi engolido por um grande peixe?",
    answers: [
      { text: "Elias", correct: false },
      { text: "Jonas", correct: true },
      { text: "Eliseu", correct: false },
      { text: "Isaías", correct: false }
    ]
  },
  {
    question: "(23) Quem escreveu o livro de Apocalipse?",
    answers: [
      { text: "Paulo", correct: false },
      { text: "João", correct: true },
      { text: "Pedro", correct: false },
      { text: "Tiago", correct: false }
    ]
  },
  {
    question: "(24) Qual era o nome hebraico de Sadraque?",
    answers: [
      { text: "Hananias", correct: true },
      { text: "Misael", correct: false },
      { text: "Azarias", correct: false },
      { text: "Daniel", correct: false }
    ]
  },
  {
    question: "(25) Quem foi o pai de João Batista?",
    answers: [
      { text: "Zacarias", correct: true },
      { text: "José", correct: false },
      { text: "Simão", correct: false },
      { text: "Anás", correct: false }
    ]
  },
  {
    question: "(26) Qual discípulo era conhecido como 'o discípulo amado'?",
    answers: [
      { text: "Pedro", correct: false },
      { text: "João", correct: true },
      { text: "Tiago", correct: false },
      { text: "André", correct: false }
    ]
  },
  {
    question: "(27) Quem foi o irmão de Moisés?",
    answers: [
      { text: "Arão", correct: true },
      { text: "Josué", correct: false },
      { text: "Calebe", correct: false },
      { text: "Nadabe", correct: false }
    ]
  },
  {
    question: "(28) Qual era o nome da mãe de Jesus?",
    answers: [
      { text: "Maria", correct: true },
      { text: "Marta", correct: false },
      { text: "Elisabete", correct: false },
      { text: "Miriam", correct: false }
    ]
  },
            {
            question:'(29) Qual foram os dois nomes indicados para substituir Judas Iscariotes?',
            answers:[
               { text:'a) Barsabás e Matias.', correct: true},
               {text:'b) Paulo e Matias.', correct: false},
               {text:'c) Paulo e José.', correct: false},
               {text:"d) Matias e Paulo",correct: false}
            
            ]},
             {
    question: "(30) Qual profeta teve uma visão de um vale de ossos secos?",
    answers: [
      { text: "Isaías", correct: false },
      { text: "Jeremias", correct: false },
      { text: "Ezequiel", correct: true },
      { text: "Daniel", correct: false }
    ]
  },
  {
    question: "(31) Quem foi o rei que viu a escrita na parede durante um banquete?",
    answers: [
      { text: "Nabucodonosor", correct: false },
      { text: "Belsazar", correct: true },
      { text: "Dario", correct: false },
      { text: "Ciro", correct: false }
    ]
  },
  {
    question: "(32) Qual é o menor versículo da Bíblia?",
    answers: [
      { text: "João 11:35", correct: true },
      { text: "1 Tessalonicenses 5:16", correct: false },
      { text: "Êxodo 20:13", correct: false },
      { text: "Lucas 20:30", correct: false }
    ]
  },
  {
    question: "(33) Quem foi o profeta que desafiou os profetas de Baal no Monte Carmelo?",
    answers: [
      { text: "Elias", correct: true },
      { text: "Eliseu", correct: false },
      { text: "Moisés", correct: false },
      { text: "Samuel", correct: false }
    ]
  },
  {
    question: "(34) Qual apóstolo teve uma visão de um lençol descendo do céu com animais?",
    answers: [
      { text: "João", correct: false },
      { text: "Tiago", correct: false },
      { text: "Pedro", correct: true },
      { text: "Paulo", correct: false }
    ]
  },
  {
    question: "(35) Quem foi lançado na cova dos leões por continuar orando a Deus?",
    answers: [
      { text: "Daniel", correct: true },
      { text: "Ezequiel", correct: false },
      { text: "Jeremias", correct: false },
      { text: "José", correct: false }
    ]
  },
  {
    question: "(36) Qual foi o primeiro milagre de Jesus registrado na Bíblia?",
    answers: [
      { text: "Curar um cego", correct: false },
      { text: "Transformar água em vinho", correct: true },
      { text: "Multiplicar pães e peixes", correct: false },
      { text: "Andar sobre as águas", correct: false }
    ]
  },
  {
    question: "(37) Quem traiu Jesus por trinta moedas de prata?",
    answers: [
      { text: "Pedro", correct: false },
      { text: "Judas Iscariotes", correct: true },
      { text: "Tomé", correct: false },
      { text: "André", correct: false }
    ]
  },
  {
    question: "(38) Qual livro da Bíblia contém o capítulo conhecido como 'o capítulo do amor'?",
    answers: [
      { text: "Romanos", correct: false },
      { text: "1 Coríntios", correct: true },
      { text: "Efésios", correct: false },
      { text: "Gálatas", correct: false }
    ]
  },
  {
    question: "(39) Quem foi o homem mais velho mencionado na Bíblia?",
    answers: [
      { text: "Noé", correct: false },
      { text: "Matusalém", correct: true },
      { text: "Adão", correct: false },
      { text: "Abraão", correct: false }
    ]
  },
  {
    question: "(40) Qual era o nome da esposa de Abraão?",
    answers: [
      { text: "Rebeca", correct: false },
      { text: "Sara", correct: true },
      { text: "Raquel", correct: false },
      { text: "Lia", correct: false }
    ]
  },
  {
    question: "(41) Quem interpretou o sonho de Faraó sobre sete vacas gordas e sete magras?",
    answers: [
      { text: "Moisés", correct: false },
      { text: "José", correct: true },
      { text: "Daniel", correct: false },
      { text: "Arão", correct: false }
    ]
  },
  {
    question: "(42) Qual discípulo andou sobre as águas em direção a Jesus?",
    answers: [
      { text: "João", correct: false },
      { text: "Pedro", correct: true },
      { text: "Tiago", correct: false },
      { text: "Tomé", correct: false }
    ]
  },
  {
    question: "(43) Quem escreveu a maioria dos Salmos?",
    answers: [
      { text: "Salomão", correct: false },
      { text: "Davi", correct: true },
      { text: "Moisés", correct: false },
      { text: "Asafe", correct: false }
    ]
  },
  {
    question: "(44) Qual é o último livro do Antigo Testamento?",
    answers: [
      { text: "Zacarias", correct: false },
      { text: "Malaquias", correct: true },
      { text: "Ageu", correct: false },
      { text: "Naum", correct: false }
    ]
  },
  {
    question: "(45) Quem foi a primeira mulher criada por Deus?",
    answers: [
      { text: "Eva", correct: true },
      { text: "Sara", correct: false },
      { text: "Miriam", correct: false },
      { text: "Raquel", correct: false }
    ]
  },
  {
    question: "(46) Qual era a profissão de Mateus antes de seguir Jesus?",
    answers: [
      { text: "Pescador", correct: false },
      { text: "Cobrador de impostos", correct: true },
      { text: "Carpinteiro", correct: false },
      { text: "Pastor", correct: false }
    ]
  },
  {
    question: "(47) Quem foi ressuscitado por Jesus após quatro dias morto?",
    answers: [
      { text: "Lázaro", correct: true },
      { text: "Jairo", correct: false },
      { text: "Eutico", correct: false },
      { text: "Tabita", correct: false }
    ]
  },
  {
    question: "(48) Qual apóstolo é conhecido por duvidar da ressurreição de Jesus até vê-lo?",
    answers: [
      { text: "Pedro", correct: false },
      { text: "Tomé", correct: true },
      { text: "João", correct: false },
      { text: "Tiago", correct: false }
    ]
  },
  {
    question: "(49) Quem foi o primeiro rei de Israel?",
    answers: [
      { text: "Davi", correct: false },
      { text: "Saul", correct: true },
      { text: "Salomão", correct: false },
      { text: "Samuel", correct: false }
    ]
  },
  {
    question: "(50) Qual profeta foi engolido por um grande peixe?",
    answers: [
      { text: "Elias", correct: false },
      { text: "Jonas", correct: true },
      { text: "Eliseu", correct: false },
      { text: "Isaías", correct: false }
    ]
  },
  {
    question: "(51) Quem escreveu o livro de Apocalipse?",
    answers: [
      { text: "Paulo", correct: false },
      { text: "João", correct: true },
      { text: "Pedro", correct: false },
      { text: "Tiago", correct: false }
    ]
  },
  {
    question: "(52) Qual era o nome hebraico de Sadraque?",
    answers: [
      { text: "Hananias", correct: true },
      { text: "Misael", correct: false },
      { text: "Azarias", correct: false },
      { text: "Daniel", correct: false }
    ]
  },
  {
    question: "(53) Quem foi o pai de João Batista?",
    answers: [
      { text: "Zacarias", correct: true },
      { text: "José", correct: false },
      { text: "Simão", correct: false },
      { text: "Anás", correct: false }
    ]
  },
  {
    question: "(54) Qual discípulo era conhecido como 'o discípulo amado'?",
    answers: [
      { text: "Pedro", correct: false },
      { text: "João", correct: true },
      { text: "Tiago", correct: false },
      { text: "André", correct: false }
    ]
  },
  {
    question: "(55) Quem foi o irmão de Moisés?",
    answers: [
      { text: "Arão", correct: true },
      { text: "Josué", correct: false },
      { text: "Calebe", correct: false },
      { text: "Nadabe", correct: false }
    ]
  },
  {
    question: "(56) Qual era o nome da mãe de Jesus?",
    answers: [
      { text: "Maria", correct: true },
      { text: "Marta", correct: false },
      { text: "Elisabete", correct: false },
      { text: "Miriam", correct: false }
    ]
  },
  {
    question: "(57) Quem foi o primeiro mártir cristão?",
    answers: [
      { text: "Tiago", correct: false },
      { text: "Estevão", correct: true },
      { text: "Pedro", correct: false },
      { text: "João", correct: false }
    ]
  },
  {
  question: "(58) Qual profeta teve uma visão de rodas dentro de rodas?",
  answers: [
    { text: "Ezequiel", correct: true },
    { text: "Isaías", correct: false },
    { text: "Jeremias", correct: false },
    { text: "Daniel", correct: false }
  ]
},
 {
    question: "(59) Qual rei ficou leproso por usurpar funções sacerdotais? (2 Crônicas 26:19-21)",
    answers: [
      { text: "Acaz", correct: false },
      { text: "Uzias", correct: true },
      { text: "Manassés", correct: false },
      { text: "Joás", correct: false }
    ]
  },
  {
    question: "(60) Qual profeta fez ferro flutuar na água? (2 Reis 6:5-7)",
    answers: [
      { text: "Elias", correct: false },
      { text: "Eliseu", correct: true },
      { text: "Moisés", correct: false },
      { text: "Jeremias", correct: false }
    ]
  }]

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
    startPhase(1);

// Service worker//
    if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.log('Erro ao registrar Service Worker:', err));
  });
}



if ('Notification' in window && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(registration => {
    console.log('Service Worker registrado com sucesso!', registration);

    // Solicitar permissão para notificações
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Permissão de notificação concedida!');
      }
    });
  }).catch(error => {
    console.error('Falha ao registrar o Service Worker:', error);
  });
}

