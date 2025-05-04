
const $startGameButton = document.querySelector('.start-quiz')
const $questionsContainer = document.querySelector('.questions-container')
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")
const $timerBar = document.getElementById("timerBar")
const $timeText = document.getElementById("timeText")

let currentQuestionIndex = 0
let totalCorrect = 0
let timer
let countdownInterval

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1))
       ;[array[i], array[j]] = [array[j], array[i]]
   }
}

function startGame(){
   shuffleArray(questions) // <- Embaralha as perguntas
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()

    // Enviar dados ao backend quando o jogo começar
    fetch('http://localhost:3000/api/registrar-acesso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Acesso registrado com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro ao registrar acesso:', error);
    });
}

function displayNextQuestion(){
    resetState()

    if (questions.length === currentQuestionIndex) {
        return finishGame()
    }

    const currentQuestion = questions[currentQuestionIndex]
    $questionText.textContent = currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        newAnswer.addEventListener("click", selectAnswer)
        $answersContainer.appendChild(newAnswer)
    })

    startTimer()
}

function resetState(){
    clearTimeout(timer)
    clearInterval(countdownInterval)

    $timeText.textContent = ""
    $timerBar.style.transition = "none"
    $timerBar.style.width = "0%"

    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event){
    clearTimeout(timer)
    clearInterval(countdownInterval)

    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame(){
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = ""
    switch (true) {
        case (performance >= 90):
            message = "Excelente :)"
            break
        case (performance >= 70):
            message = "Muito bom :)"
            break
        default:
            message = "Pode melhorar :("
    }

    $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestion} questões!<br>
            <span>Resultado: ${message}</span>
        </p>
        <button onclick="window.location.reload()" class="button">Refazer teste</button>
    `
}

function startTimer(){
    clearTimeout(timer)
    clearInterval(countdownInterval)

    let timeLeft = 30 // muda os segundos que aparece na tela
    $timeText.textContent = `Tempo restante: ${timeLeft}s`

    $timerBar.style.transition = 'none'
    $timerBar.style.width = '100%'

    setTimeout(() => {
        $timerBar.style.transition = 'width 30s linear' // muda os segundos que aparece na barra
        $timerBar.style.width = '0%'
    }, 50)

    countdownInterval = setInterval(() => {
        timeLeft--
        $timeText.textContent = `Tempo restante: ${timeLeft}s`
        if (timeLeft <= 0) {
            clearInterval(countdownInterval)
        }
    }, 1000)

    timer = setTimeout(() => {
        disableAnswers()
        document.body.classList.add("incorrect")
        $nextQuestionButton.classList.remove("hide")
        currentQuestionIndex++
    }, 30000) // muda o tempo de resposta
}

function disableAnswers(){
    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
        button.disabled = true
    })
}

// Suas perguntas de quiz
const questions = [
   /*{
        question: "(1) A quem Paulo chamou de 'meu companheiro de lutas' (Referência bíblica: Filemon 1:2)?",
        answers:[
            {text: "Apolo", correct: false },
            {text: "Afia", correct: false },
            {text: "Arquipo", correct: true},
            {text: "Adonias", correct: false}
        ]
    },
{
    question: "(2) Quais discipulos perguntaram a jesus se podiam fazer descer fogo do céu? (Referencia biblica: Lucas 9:54.)",
    answers: [
        {text: "João e Tiago", correct: true},
        {text: "Pedro e João", correct: false},
        {text: "Tiago e Pedro", correct:false },
        {text: "Tiago e Matheus", correct: false }
    ]
        },
        {
            question:'(3) Qual era o nome da serpente de bronze que Moisés tinha feito? (2 Reis 18:4.)',
            answers:[
               { text:'Aserá', correct: false},
               {text:'Leviatã', correct: false},
               {text:'Neustã', correct: true},
               {text:"Athenis",correct: false},
            ]},
               {
            question:'(4) Qual era o nome babilônico de Daniel? (Ref. biblica Daniel 1:7.)',
            answers:[
               { text:'Aspenaz', correct: false},
               {text:'Beltessazar', correct: true},
               {text:'Abede-Nego', correct: false},
               {text:"Mongero",correct: false},
            ]},
            {
            question:'(5) Qual o nome que Jacó deu ao lugar onde sonhou com Deus?',
            answers:[
               { text:'Betuel', correct: false},
               {text:'Luz', correct: false},
               {text:'Bezel', correct: false},
               {text:"Betel",correct: true}
            
            ]},
            {
            question:'(6) Qual o livro da biblia que termina com um ponto de interrogação? (Ref. ? 4:11)',
            answers:[
               { text:'Jonas', correct: true},
               {text:'Joel', correct: false},
               {text:'Judas', correct: false},
               {text:"João",correct: false}
            
            ]},
            {
            question:'Qual livro se encontra no novo testamento',
            answers:[
               { text:'Sofonias', correct: false},
               {text:'Obadias', correct: false},
               {text:'Habacuque', correct: false},
               {text:"Filemom",correct: true}
            
            ]},
            {
            question:'(8) Em quais livros da Biblia não encontramos a palavra Deus',
            answers:[
               { text:'Ester e Cânticos', correct: true},
               {text:'Ageu e Amós', correct: false},
               {text:'Oséias e Eclesiastes', correct: false},
               {text:"Obadias e Malaquias",correct: false}
            
            ]},
            {
            question:'(9) Qual o menor livro da Bíblia',
            answers:[
               { text:'judas', correct: false},
               {text:'ll João', correct: true},
               {text:'lll João', correct: false},
               {text:"Ester",correct: false}
            
            ]},
            {
            question:'(10) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(11)  Quem escreveu a Epístola de Judas?',
            answers:[
               { text:'a) Judas irmão de Tiago', correct: true},
               {text:'b) Judas Iscariotes', correct: false},
               {text:'c) João Evangelista', correct: false},
               {text:"d) Lucas ",correct: false}
            
            ]},
            {
            question:'(12) Quem teve seu corpo disputado pelo arcanjo Miguel e o Diabo?',
            answers:[
               { text:'Jesus ', correct: false},
               {text:'Elizeu', correct: false},
               {text:'Moisés', correct: true},
               {text:"Abraão",correct: false}
            
            ]},
            {
            question:'(13) Qual era o nome da profetisa que estava fazendo a igreja de Tiatira cair em imoralidade sexual e idolatria?',
            answers:[
               { text:'Jezabel', correct: true},
               {text:'Lilith', correct: false},
               {text:'Dalila', correct: false},
               {text:"Ester",correct: false}
            
            ]},
            {
            question:'(14) A Morte montada em um cavalo amarelo surgiu na abertura de qual selo em Apocalipse?',
            answers:[
               { text:'a) 1º selo', correct: false},
               {text:'b) 7º selo', correct: false},
               {text:'c) 4º selo', correct: true},
               {text:"d) 6º selo",correct: false}
            
            ]},
            {
            question:'(15) Quem foi a única mulher citada na Bíblia a ter o status de juíza e líder de Israel?',
            answers:[
               { text:'a) Jael', correct: false},
               {text:'b) Débora', correct: true},
               {text:'c) Ester', correct: false},
               {text:"d) Rute",correct: false}
            
            ]},
            {
            question:"(16)  A quem o Apóstolo Paulo chamou de 'médico amado'?",
            answers:[
               { text:'a) Jesus', correct: false},
               {text:'b) Demas', correct: false},
               {text:'c) Lucas', correct: true},
               {text:"d) João",correct: false}
            
            ]},
            {
            question:'(17) Quem governou sendo rei e sacerdote ao mesmo tempo?',
            answers:[
               { text:'a) Joacaz', correct: false},
               {text:'b) Manassés ', correct: false},
               {text:'c) melquias', correct: false},
               {text:"d)  Melquisedeque",correct: true}
            
            ]},
            {
            question:'(18) Que animal mordeu a mão do Apóstolo Paulo?',
            answers:[
               { text:'a) Lagarto', correct: false},
               {text:'b) Escorpião', correct: false},
               {text:'c) Víbora', correct: true},
               {text:"d) Abelha",correct: false}
            
            ]},
            {
            question:'(19) Qual era a idade de Calebe quando pediu Hebrom para Josué?',
            answers:[
               { text:'a) 40 anos', correct: false},
               {text:'b) 70 anos', correct: false},
               {text:'c) 120 anos', correct: false},
               {text:"d) 85 anos",correct: true}
            
            ]},
            {
            question:'(20) Por quantas moedas Judas entregou Jesus?',
            answers:[
               { text:'a) 30 moedas de ouro', correct: false},
               {text:'b) 30 moedas de prata', correct: true},
               {text:'c) 100 denários', correct: false},
               {text:"d) 30 moedas de bronze",correct: false}
            
            ]},
            {
            question:"(21) Quem foram apelidados por Jesus de Boanerges que significa 'Filhos do Trovão'?",
            answers:[
               { text:'a) João e Pedro', correct: false},
               {text:'b) lucas e pedro', correct: false},
               {text:'c) Pedro e Tiago', correct: false},
               {text:"João e Tiago",correct: true}
            
            ]},
            {
            question:'(22) Qual era o nome da única filha de Lia?',
            answers:[
               { text:'a) Zilpa', correct: false},
               {text:'b) Diná', correct: true},
               {text:'c) Raquel', correct: false},
               {text:"d)Ester",correct: false}
            
            ]},
            {
            question:'(23) Qual o discípulo que acompanhou Jesus até a sua crucificação?',
            answers:[
               { text:'a) André', correct: false},
               {text:'b) Tiago', correct: false},
               {text:'c) João', correct: true},
               {text:"d) Pedro",correct: false}
            
            ]},
            {
            question:'(24) Quantos capítulos tem o Livro de Naum?',
            answers:[
               { text:'1', correct: false},
               {text:'4', correct: false},
               {text:'5', correct: false},
               {text:"3",correct: true}
            
            ]},
            {
            question:'(25) O Velho Testamento reúne mais livros do que o Novo Testamento?',
            answers:[
               { text:'sim', correct: true},
               {text:'não', correct: false},
               {text:'Ambos tem a mesma quantidade', correct: false},
              
            
            ]},
            {
            question:'(26) A estátua do sonho de Nabucodonosor era composta de quais elementos?',
            answers:[
               { text:'a) Toda em ouro', correct: false},
               {text:'b) Ouro, prata, , onix e ferro', correct: false},
               {text:'Ouro, prata, bronze, onix e ferro', correct: false},
               {text:"d) Ouro, prata, bronze, ferro e barro.",correct: true}
            
            ]},
            {
            question:'(27) Quem era conhecido por ser cobrador de impostos?',
            answers:[
               { text:'a) Zacarias', correct: false},
               {text:'b) Zebedeu', correct: false},
               {text:'c) Zaqueu', correct: true},
               {text:"d) Zebeus",correct: false}
            
            ]},
            {
            question:'(28) Quanto tempo Jonas ficou preso dentro da barriga de um grande peixe?',
            answers:[
               { text:'a) 7 dias', correct: false},
               {text:'b) 3 dias', correct: true},
               {text:'c) 1 dia', correct: false},
               {text:"d) 4 dias",correct: false}
            
            ]},
            {
            question:'(29) Qual foram os dois nomes indicados para substituir Judas Iscariotes?',
            answers:[
               { text:'a) Barsabás e Matias.', correct: true},
               {text:'b) Paulo e Matias.', correct: false},
               {text:'c) Paulo e José.', correct: false},
               {text:"d) Matias e Paulo",correct: false}
            
            ]},
            {
            question:'(30)  Em Tessalônica, Paulo, Silas e Timóteo se refugiaram na casa de qual irmão?',
            answers:[
               { text:'a) Apolo', correct: false},
               {text:'b) Barnabé', correct: false},
               {text:'c) arquipo', correct: false},
               {text:"d) Jasom",correct: true}
            
            ]},
            {
            question:'(31) Adão viveu ao todo quantos anos?',
            answers:[
               { text:'a) 930 anos', correct: true},
               {text:'b) 1000 anos', correct: false},
               {text:'c) 500 anos', correct: false},
               {text:"d) 850 anos",correct: false}
            
            ]},
            {
            question:'(32) Jesus enviou quantos discípulos para a missão de pregar o Evangelho?',
            answers:[
               { text:'a) 7 discípuloss', correct: false},
               {text:'b) 70 discípulos', correct: true},
               {text:'c) 12 discípulos', correct: false},
               {text:"d) 6 discípulos",correct: false}
            
            ]},
            {
            question:'(33)  Em qual dia da criação foi feito o sol, a lua e as estrelas?',
            answers:[
               { text:'a) 1º dia', correct: false},
               {text:'b) 3º dia', correct: false},
               {text:'c) 4º dia', correct: true},
               {text:"d) 6º dia",correct: false}
            
            ]},
            {
            question:'(34) O Livro de Atos dos Apóstolos é conhecido como...',
            answers:[
               { text:'a) um livro histórico', correct: true},
               {text:'b) um livro profético', correct: false},
               {text:'c) um livro poético', correct: false},
               {text:"d) um livro teologico",correct: false}
            
            ]},
            {
            question:'(35) Depois do Dilúvio, Noé viveu por mais quantos anos?',
            answers:[
               { text:'a) 350 anos', correct: true},
               {text:'b) 100 anos', correct: false},
               {text:'c) 200 anos', correct: false},
               {text:"d) 50 anos",correct: false}
            
            ]},
            {
            question:'(36) Qual é o quinto livro do Novo Testamento?',
            answers:[
               { text:'a)Evangelho de Marcos', correct: false},
               {text:'b) Carta aos Romanos', correct: false},
               {text:'c) Atos dos Apóstolos', correct: true},
               {text:"d) Evangelho de lucas",correct: false}
            
            ]},
            {
            question:'(37) Qual era o nome da mulher de Jó?',
            answers:[
               { text:'a)Abgail', correct: false},
               {text:'b) Dâmares', correct: false},
               {text:'c) A BIBLIA NÃO DIZ', correct: true},
               {text:"d) Sophia",correct: false}
            
            ]},
            {
            question:'(38)  Quem Noé amaldiçoou após saber que foi visto em nudez?',
            answers:[
               { text:'a) Canaã', correct: true},
               {text:'b) Cam', correct: false},
               {text:'c) Jafé', correct: false},
               {text:"d) Ezau",correct: false}
            
            ]},
            {
            question:'(39) Qual das alternativas não é um livro apócrifo?',
            answers:[
               { text:'a) Livro Enoque', correct: false},
               {text:'b) Livro de Ageu', correct: true},
               {text:'c) Livro de Tobias', correct: false},
               {text:"d) Livro de Thomas",correct: false}
            
            ]},
            {
            question:'(40) Qual destes livros contém mais de um capítulo?',
            answers:[
               { text:'a) Judas', correct: false},
               {text:'b) Obadias', correct: false},
               {text:'c) Joel', correct: true},
               
            
            ]},
            {
            question:'(41) Qual é o versículo mais extenso da Bíblia?',
            answers:[
               { text:'a)Ester 8:9', correct: true},
               {text:'b) Salmos 119:43', correct: false},
               {text:'c) Isaías 24:2', correct: false},
               {text:"d) jeremias 3:5",correct: false}
            
            ]},
            {
               question: "(42) Quantos versículos tem Salmos 119?",
               answers: [
                   { text: "a) 176 versículos", correct: true },
                   { text: "b) 200 versículos.", correct: false },
                   { text: "c) 100 versículos.", correct: false },
                   { text: "d) 150 versículos.", correct: false }
               ]},
           {
               question: "(43) Qual a mulher que acolheu o seu inimigo e depois o matou? (Juízes 4:18-21)",
               answers: [
                   { text: "a) Raquel", correct: false },
                   { text: "b) Débora", correct: false },
                   { text: "c) Jael", correct: true },
                   { text: "d) Rebeca", correct: false }
               ]
           },
           {
               question: "(44) Que homem depois de morto, matou mais pessoas do que em vida? (Juízes 16:30)",
               answers: [
                   { text: "a) Elias", correct: false },
                   { text: "b) Sansão", correct: true },
                   { text: "c) Judas", correct: false },
                   { text: "d) Davi", correct: false }
               ]
           },
           {
               question: "(45) Quem se tornou rei enquanto procurava as jumentas do seu pai? (1 Samuel 9:3)",
               answers: [
                   { text: "a) Davi", correct: false },
                   { text: "b) Saul", correct: true },
                   { text: "c) Acabe", correct: false },
                   { text: "d) Salomão", correct: false }
               ]
           },
           {
               question: "(46) Quem tinha um cabelo que pesava mais de dois quilos e era necessário cortar todo ano? (2 Samuel 14:26)",
               answers: [
                   { text: "a) Absalão", correct: true },
                   { text: "b) Davi", correct: false },
                   { text: "c) Sansão", correct: false },
                   { text: "d) Eliabe", correct: false }
               ]
           },
           {
               question: "(47) Quem teve a vida prolongada por mais 15 anos após orar? (Isaías 38:5)",
               answers: [
                   { text: "a) Enoque", correct: false },
                   { text: "b) Matusalém", correct: false },
                   { text: "c) Ezequias", correct: true },
                   { text: "d) Elias", correct: false }
               ]
           },
           {
               question: "(48) Quem foram apelidados pela multidão em Listra de Zeus e Hermes? (Atos 14:12)",
               answers: [
                   { text: "a) Pedro e João", correct: false },
                   { text: "b) Barnabé e Paulo", correct: true },
                   { text: "c) Jesus e Paulo", correct: false },
                   { text: "d) João e Marcos", correct: false }
               ]
           },
           {
               question: "(49) Quais os 2 homens que o Apóstolo Paulo disse que naufragaram na fé? (1 Timóteo 1:19-20)",
               answers: [
                   { text: "a) Himeneu e Alexandre", correct: true },
                   { text: "b) Janes e Jambres", correct: false },
                   { text: "c) Silas e Barnabé", correct: false },
                   { text: "d) Dimas e Tito", correct: false }
               ]
           },
           {
               question: "(50) Qual foi o profeta que surgiu depois de Malaquias? (Mateus 3:1)",
               answers: [
                   { text: "a) Zacarias", correct: false },
                   { text: "b) Joel", correct: false },
                   { text: "c) João Batista", correct: true },
                   { text: "d) Elias", correct: false }
               ]
           },
           {
               question: "(51) Quantos carros de ferro Jabim possuía? (Juízes 4:2)",
               answers: [
                   { text: "a) 900 carros de ferro.", correct: true },
                   { text: "b) 300 carros de ferro.", correct: false },
                   { text: "c) 100 carros de ferro.", correct: false },
                   { text: "d) 1.000 carros de ferro.", correct: false }
               ]
           },
           {
               question: "(52) Qual o nome do pai de Saul? (1 Samuel 9:1)",
               answers: [
                   { text: "a) Abiel", correct: false },
                   { text: "b) Quis", correct: true },
                   { text: "c) Zeror", correct: false },
                   { text: "d) Cis", correct: false }
               ]
           },
           {
               question: "(53) Sísera foi morto em que situação? (Juízes 4:21)",
               answers: [
                   { text: "a) Enquanto dormia.", correct: true },
                   { text: "b) Enquanto lutava.", correct: false },
                   { text: "c) Enquanto orava.", correct: false },
                   { text: "d) Enquanto fugia.", correct: false }
               ]
           },
           {
               question: "(54) Balaão foi chamado por quem para amaldiçoar o povo de Israel? (Números 22:4)",
               answers: [
                   { text: "a) Moabe", correct: false },
                   { text: "b) Balaque", correct: true },
                   { text: "c) Zipor", correct: false },
                   { text: "d) Zadoque", correct: false }
               ]
           },
           {
               question: "(55) Oseias profetizou durante o reinado de quais reis? (Oséias 1:1)",
               answers: [
                   { text: "a) Saul, Davi e Salomão.", correct: false },
                   { text: "b) Jozias, Joacaz, Ocazias e Jorão.", correct: false },
                   { text: "c) Uzias, Jotão, Acaz, Ezequias e Jeroboão.", correct: true },
                   { text: "d) Ezequiel, Isaías, Jeremias e Daniel.", correct: false }
               ]
           },
           {
               question: "(56) Oséias se casou com... (Oséias 1:2-3)",
               answers: [
                   { text: "a) Uma rainha.", correct: false },
                   { text: "b) Uma mulher adúltera.", correct: true },
                   { text: "c) Uma mulher estrangeira.", correct: false },
                   { text: "d) Uma levita.", correct: false }
               ]
           },
           {
               question: "(57) Sofonias foi profeta durante qual reinado? (Sofonias 1:1)",
               answers: [
                   { text: "a) Reinado de Josias.", correct: true },
                   { text: "b) Reinado de Acabe.", correct: false },
                   { text: "c) Reinado de Acaz.", correct: false },
                   { text: "d) Reinado de Salomão.", correct: false }
               ]
           },
           {
               question: "(58) Que povo recebeu Paulo com grande interesse, e examinou as Escrituras, para ver se tudo era verdade? (Atos 17:11)",
               answers: [
                   { text: "a) Os tessalônios.", correct: false },
                   { text: "b) Os bereanos.", correct: true },
                   { text: "c) Os atenienses.", correct: false },
                   { text: "d) Os coríntios.", correct: false }
               ]
           },
           {
               question: "(59) O que deixou Paulo indignado em Atenas? (Atos 17:16-17)",
               answers: [
                   { text: "a) A promiscuidade do povo grego.", correct: false },
                   { text: "b) A quantidade de ídolos na cidade.", correct: true },
                   { text: "c) A falta de sinagogas na cidade.", correct: false },
                   { text: "d) A frieza espiritual.", correct: false }
               ]
           },
           {
               question: "(60) Em Atenas, onde Paulo foi levado para falar sobre Jesus Cristo? (Atos 17:19)",
               answers: [
                   { text: "a) Coliseu.", correct: false },
                   { text: "b) Santuário.", correct: false },
                   { text: "c) Areópago", correct: true },
                   { text: "d) Sinagoga", correct: false }
               ]
           },
           {
               question: "(61) No discurso de Paulo em Atenas, quem creu e se juntou a ele? (Atos 17:34)",
               answers: [
                   { text: "a) Nicodemos", correct: false },
                   { text: "b) Dionísio", correct: true },
                   { text: "c) Arquimedes", correct: false },
                   { text: "d) Barnabé", correct: false }
               ]
           },
           {
               question: "(62) Qual foi o destino de Paulo depois de Atenas? (Atos 18:1)",
               answers: [
                   { text: "a) Tessalônica", correct: false },
                   { text: "b) Roma", correct: false },
                   { text: "c) Corinto", correct: true },
                   { text: "d) Éfeso", correct: false }
               ]
           },
           {
               question: "(63) Quem jurou não comer nem beber enquanto não matassem Paulo? (Atos 23:12-14)",
               answers: [
                   { text: "a) Os judeus.", correct: true },
                   { text: "b) Os gregos.", correct: false },
                   { text: "c) Os romanos.", correct: false },
                   { text: "d) Os coríntios.", correct: false }
               ]
           },
           {
               question: "(64) Quais são as 7 igrejas que receberam as cartas em Apocalipse? (Apocalipse 1:11)",
               answers: [
                   { text: "a) Éfeso, Filipo, Pérgamo, Tiatira, Creta, Filadélfia e Laodiceia.", correct: false },
                   { text: "b) Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia.", correct: true },
                   { text: "c) Éfeso, Macedônia, Pérgamo, Filipo, Tessalônica, Filadélfia e Laodiceia.", correct: false },
                   { text: "d) Antioquia, Esmirna, Tiatira, Sardes, Tessalônica, Filadélfia e Laodiceia.", correct: false }
               ]
           },
          {
               question: "(65) O que houve quando o Cordeiro quebrou o último selo? (Apocalipse 8:1)",
               answers: [
                   { text: "a) O Diabo foi aprisionado durante 2000 anos.", correct: false },
                   { text: "b) Houve um sinal que arrebatou os crentes em Cristo.", correct: false },
                   { text: "c) Houve silêncio nos céus cerca de meia hora.", correct: true },
                   { text: "d) Os anjos tocaram as trombetas.", correct: false }
               ]
           },
           {
               question: "(66) Qual era a característica da besta que saiu da terra? (Apocalipse 13:11)",
               answers: [
                   { text: "a) Dois chifres como cordeiro, mas que falava como dragão.", correct: true },
                   { text: "b) Dez chifres e sete cabeças, com dez coroas, uma sobre cada chifre.", correct: false },
                   { text: "c) Sete chifres, sete cabeças e da sua língua saía fogo.", correct: false },
                   { text: "d) Um corpo de leopardo, pés de urso e boca de leão.", correct: false }
               ]
           },
           {
               question: "(67) Quantas taças da ira de Deus foram derramadas em Apocalipse? (Apocalipse 16:1)",
               answers: [
                   { text: "a) 6 taças.", correct: false },
                   { text: "b) 12 taças.", correct: false },
                   { text: "c) 7 taças.", correct: true },
                   { text: "d) 10 taças.", correct: false }
               ]
           },
           {
               question: "(68) De que material era o muro da Nova Jerusalém? (Apocalipse 21:18)",
               answers: [
                   { text: "a) Ouro", correct: false },
                   { text: "b) Jaspe", correct: true },
                   { text: "c) Vidro", correct: false },
                   { text: "d) Bronze", correct: false }
               ]
           },
           
           */ {
              question: "(69) Quem foi o primogênito de Jacó? (Gênesis 29:32)",
              answers: [
                { text: "a) Júda", correct: false },
                { text: "b) José", correct: false },
                { text: "c) Rúben", correct: true },
                { text: "d) Simeão", correct: false }
              ]
            },
            {
              question: "(70) Quem viu um arbusto em chamas que não se consumia? (Êxodo 3:2-3)",
              answers: [
                { text: "a) Abraão", correct: false },
                { text: "b) Isaque", correct: false },
                { text: "c) Moisés", correct: true },
                { text: "d) Noé", correct: false }
              ]
            }

            {
              question: "(71) Quem foi jogado na cova dos leões? (Daniel 6:16)",
              answers: [
                { text: "a) Daniel", correct: true },
                { text: "b) Davi", correct: false },
                { text: "c) Elias", correct: false },
                { text: "d) Moisés", correct: false }
              ]
            },
            {
              question: "(72) Qual era a profissão de Mateus antes de seguir Jesus? (Mateus 9:9)",
              answers: [
                { text: "a) Pescador", correct: false },
                { text: "b) Médico", correct: false },
                { text: "c) Publicano", correct: true },
                { text: "d) Carpinteiro", correct: false }
              ]
            },
            {
              question: "(73) Quem interpretou o sonho de Nabucodonosor de uma estátua com pés de ferro e barro? (Daniel 2:31-45)",
              answers: [
                { text: "a) Isaías", correct: false },
                { text: "b) José", correct: false },
                { text: "c) Daniel", correct: true },
                { text: "d) Jeremias", correct: false }
              ]
            },
            {
              question: "(74) Quem conduziu os israelitas para fora do Egito? (Êxodo 3:10)",
              answers: [
                { text: "a) Arão", correct: false },
                { text: "b) Josué", correct: false },
                { text: "c) Moisés", correct: true },
                { text: "d) Miriã", correct: false }
              ]
            },
            {
              question: "(75) Quem foi o rei da Babilônia que enlouqueceu e viveu como um animal? (Daniel 4:33)",
              answers: [
                { text: "a) Belsazar", correct: false },
                { text: "b) Dario", correct: false },
                { text: "c) Nabucodonosor", correct: true },
                { text: "d) Ciro", correct: false }
              ]
            },
            {
              question: "(76) Onde Jesus realizou seu primeiro milagre? (João 2:1-11)",
              answers: [
                { text: "a) Jerusalém", correct: false },
                { text: "b) Nazaré", correct: false },
                { text: "c) Caná da Galiléia", correct: true },
                { text: "d) Jericó", correct: false }
              ]
            },
            {
              question: "(77) Quem subiu numa figueira para ver Jesus? (Lucas 19:1-10)",
              answers: [
                { text: "a) Pedro", correct: false },
                { text: "b) Tomé", correct: false },
                { text: "c) Zaqueu", correct: true },
                { text: "d) Bartolomeu", correct: false }
              ]
            },
            {
              question: "(78) Quem escreveu a maioria das cartas do Novo Testamento?",
              answers: [
                { text: "a) Pedro", correct: false },
                { text: "b) João", correct: false },
                { text: "c) Paulo", correct: true },
                { text: "d) Tiago", correct: false }
              ]
            },
            {
               question: "(79) Quem foi a mão do rei Davi? (1 Samuel 18:20-27)",
               answers: [
                 { text: "a) Jonatas", correct: false },
                 { text: "b) Saul", correct: false },
                 { text: "c) Jonathan", correct: false },
                 { text: "d) Mical", correct: true }
               ]
             },
             {
               question: "(80) Qual discípulo andou sobre as águas com Jesus? (Mateus 14:29)",
               answers: [
                 { text: "a) João", correct: false },
                 { text: "b) Tiago", correct: false },
                 { text: "c) Pedro", correct: true },
                 { text: "d) Tomé", correct: false }
               ]
             },
             {
               question: "(81) Onde Moisés recebeu os Dez Mandamentos? (Êxodo 19:20)",
               answers: [
                 { text: "a) Monte Carmelo", correct: false },
                 { text: "b) Monte Sinai", correct: true },
                 { text: "c) Monte Horebe", correct: false },
                 { text: "d) Monte Nebo", correct: false }
               ]
             },
             {
               question: "(82) Quem foi o rei mais sábio de Israel? (1 Reis 3:12)",
               answers: [
                 { text: "a) Davi", correct: false },
                 { text: "b) Salomão", correct: true },
                 { text: "c) Saul", correct: false },
                 { text: "d) Josias", correct: false }
               ]
             },
             {
               question: "(83) Qual o primeiro livro do Novo Testamento?",
               answers: [
                 { text: "a) Marcos", correct: false },
                 { text: "b) João", correct: false },
                 { text: "c) Lucas", correct: false },
                 { text: "d) Mateus", correct: true }
               ]
             },
             {
               question: "(84) Quem foi lançado na fornalha ardente? (Daniel 3:19-23)",
               answers: [
                 { text: "a) Sadraque, Mesaque e Abednego", correct: true },
                 { text: "b) Daniel", correct: false },
                 { text: "c) Jonas", correct: false },
                 { text: "d) Elias", correct: false }
               ]
             },
             {
               question: "(85) Quantos foram os dias de criação no Gênesis? (Gênesis 1)",
               answers: [
                 { text: "a) 5 dias", correct: false },
                 { text: "b) 6 dias", correct: true },
                 { text: "c) 7 dias", correct: false },
                 { text: "d) 8 dias", correct: false }
               ]
             },
             {
               question: "(86) Quem foi a esposa de Isaque? (Gênesis 24:67)",
               answers: [
                 { text: "a) Sara", correct: false },
                 { text: "b) Rebeca", correct: true },
                 { text: "c) Raquel", correct: false },
                 { text: "d) Lia", correct: false }
               ]
             },
             {
               question: "(87) Quem subiu ao céu em um redemoinho? (2 Reis 2:11)",
               answers: [
                 { text: "a) Moisés", correct: false },
                 { text: "b) Elias", correct: true },
                 { text: "c) Ezequiel", correct: false },
                 { text: "d) Eliseu", correct: false }
               ]
             },
             {
               question: "(88) Quem foi o primeiro rei de Israel? (1 Samuel 10:1)",
               answers: [
                 { text: "a) Saul", correct: true },
                 { text: "b) Davi", correct: false },
                 { text: "c) Salomão", correct: false },
                 { text: "d) Josué", correct: false }
               ]
             },
             {
               question: "(89) Quem foi o mais forte homem da Bíblia? (Juízes 13:24-25)",
               answers: [
                 { text: "a) Gideão", correct: false },
                 { text: "b) Sansão", correct: true },
                 { text: "c) Davi", correct: false },
                 { text: "d) Absalão", correct: false }
               ]
             },
             {
               question: "(90) Quem matou Golias? (1 Samuel 17:49)",
               answers: [
                 { text: "a) Saul", correct: false },
                 { text: "b) Samuel", correct: false },
                 { text: "c) Davi", correct: true },
                 { text: "d) Jonatã", correct: false }
               ]
             },
             {
               question: "(91) Quem foi o pai de João Batista? (Lucas 1:57-60)",
               answers: [
                 { text: "a) José", correct: false },
                 { text: "b) Zacarias", correct: true },
                 { text: "c) Simeão", correct: false },
                 { text: "d) Elcana", correct: false }
               ]
             },
             {
               question: "(92) Quem foi jogado ao mar e depois engolido por um grande peixe? (Jonas 1:17)",
               answers: [
                 { text: "a) Ezequiel", correct: false },
                 { text: "b) Elias", correct: false },
                 { text: "c) Jonas", correct: true },
                 { text: "d) Moisés", correct: false }
               ]
             },
             {
               question: "(93) Quem foi a primeira pessoa a morrer por causa do evangelho? (Atos 7:54-60)",
               answers: [
                 { text: "a) Pedro", correct: false },
                 { text: "b) Estevão", correct: true },
                 { text: "c) Tiago", correct: false },
                 { text: "d) João", correct: false }
               ]
             },
             {
               question: "(94) Quem batizou Jesus? (Mateus 3:13-17)",
               answers: [
                 { text: "a) João Batista", correct: true },
                 { text: "b) Paulo", correct: false },
                 { text: "c) Pedro", correct: false },
                 { text: "d) Tiago", correct: false }
               ]
             },
             {
               question: "(95) Quem servia vinho ao rei e levou o susto de sua vida? (Neemias 1:11)",
               answers: [
                 { text: "a) José", correct: false },
                 { text: "b) Esdras", correct: false },
                 { text: "c) Neemias", correct: true },
                 { text: "d) Daniel", correct: false }
               ]
             },
             {
               question: "(96) Quem era o irmão traidor que vendia os irmãos por moedas de prata? (Mateus 26:14-16)",
               answers: [
                 { text: "a) José", correct: false },
                 { text: "b) Simão", correct: false },
                 { text: "c) Levi", correct: false },
                 { text: "d) Judas Iscariotes", correct: true }
               ]
             },
             {
               question: "(97) Quem foi a primeira mulher? (Gênesis 2:21-23)",
               answers: [
                 { text: "a) Eva", correct: true },
                 { text: "b) Sara", correct: false },
                 { text: "c) Rebeca", correct: false },
                 { text: "d) Ismália", correct: false }
               ]
             },
             {
               question: "(98) Qual Profeta foi chamado para falar com o faraó do Egito? (Êxodo 3:10)",
               answers: [
                 { text: "a) José", correct: false },
                 { text: "b) Moisés", correct: true },
                 { text: "c) Elias", correct: false },
                 { text: "d) Jeremias", correct: false }
               ]
             },
             {
               question: "(99) Quem profetizou sobre o Vale dos Ossos Secos? (Ezequiel 37:1-14)",
               answers: [
                 { text: "a) Isaías", correct: false },
                 { text: "b) Jeremias", correct: false },
                 { text: "c) Ezequiel", correct: true },
                 { text: "d) Daniel", correct: false }
               ]
             },
             {
               question: "(100) Quem foi o filho que Jacó amava mais? (Gênesis 37:3)",
               answers: [
                 { text: "a) Levi", correct: false },
                 { text: "b) Judá", correct: false },
                 { text: "c) José", correct: true },
                 { text: "d) Benjamim", correct: false }
               ]
             },
             {
               question: "(101) Quem sobreviveu a um naufrágio em Malta? (Atos 28:1-2)",
               answers: [
                 { text: "a) Pedro", correct: false },
                 { text: "b) Paulo", correct: true },
                 { text: "c) João", correct: false },
                 { text: "d) Barnabé", correct: false }
               ]
             },
             {
               question: "(102) Quem era considerado amigo de Deus? (Tiago 2:23)",
               answers: [
                 { text: "a) Moisés", correct: false },
                 { text: "b) Davi", correct: false },
                 { text: "c) Abraão", correct: true },
                 { text: "d) Ló", correct: false }
               ]
             },
             {
               question: "(103) Quem interpretou o sonho do Faraó? (Gênesis 41:25)",
               answers: [
                 { text: "a) Daniel", correct: false },
                 { text: "b) José", correct: true },
                 { text: "c) Moisés", correct: false },
                 { text: "d) Eli", correct: false }
               ]
             },
             {
               question: "(104) Qual foi a última praga do Egito? (Êxodo 12:29-30)",
               answers: [
                 { text: "a) Rãs", correct: false },
                 { text: "b) Gafanhotos", correct: false },
                 { text: "c) Água em sangue", correct: false },
                 { text: "d) Morte dos primogênitos", correct: true }
               ]
             },
             {
               question: "(105) Quem foi o líder dos israelitas após a morte de Moisés? (Josué 1:1-2)",
               answers: [
                 { text: "a) Josué", correct: true },
                 { text: "b) Calebe", correct: false },
                 { text: "c) Arão", correct: false },
                 { text: "d) Elias", correct: false }
               ]
             },
             {
               question: "(106) Quem foi o homem mais velho na Bíblia? (Gênesis 5:27)",
               answers: [
                 { text: "a) Adão", correct: false },
                 { text: "b) Noé", correct: false },
                 { text: "c) Matusalém", correct: true },
                 { text: "d) Abraão", correct: false }
               ]
             },
             {
               question: "(107) Quantas vezes Pedro negou Jesus? (Mateus 26:75)",
               answers: [
                 { text: "a) Uma vez", correct: false },
                 { text: "b) Duas vezes", correct: false },
                 { text: "c) Três vezes", correct: true },
                 { text: "d) Quatro vezes", correct: false }
               ]
             },
             {
               question: "(108) Qual foi o primeiro milagre de Jesus? (João 2:1-11)",
               answers: [
                 { text: "a) Curar um cego", correct: false },
                 { text: "b) Multiplicar pães", correct: false },
                 { text: "c) Ressuscitar Lázaro", correct: false },
                 { text: "d) Transformar água em vinho", correct: true }
               ]},
               {
                question: "(109) Qual o nome e a idade da pessoa mais velha mencionada na Bíblia?",
                answers: [
                    { text: "Enos, viveu 905 anos", correct: false },
                    { text: "Noé, viveu 990 anos", correct: false },
                    { text: "Matusalém, viveu 969 anos", correct: true },
                    { text: "Rainha Ester, viveu 859 anos", correct: false }
                ]
            },
            {
                question: "(110) Qual desses não teve o seu nome mudado na Bíblia?",
                answers: [
                    { text: "Sara", correct: false },
                    { text: "Abraão", correct: false },
                    { text: "Jacó", correct: false },
                    { text: "Davi", correct: true },
                    { text: "Pedro", correct: false }
                ]
            },
            {
                question: "(111) Qual dos nomes de Deus Moisés deveria dar aos israelitas, quando falasse de quem tinha lhe enviado?",
                answers: [
                    { text: "Elohim", correct: false },
                    { text: "El Shadday", correct: false },
                    { text: "Eu sou o que sou", correct: true },
                    { text: "Eu sou o Senhor", correct: false }
                ]
            },
            {
                question: "(112) Sobre Samuel, o que não é verdade?",
                answers: [
                    { text: "Sua mãe se chamava Ana", correct: false },
                    { text: "Ungiu 3 reis de Israel: José, Saul e Davi", correct: true },
                    { text: "Sucedeu o profeta Eli", correct: false },
                    { text: "Teve uma visão enquanto ainda era muito novo", correct: false }
                ]
            },
            {
                question: "(113) Que animal falou com Balaão?",
                answers: [
                    { text: "jumenta", correct: true },
                    { text: "camelo", correct: false },
                    { text: "cordeiro", correct: false },
                    { text: "pomba", correct: false }
                ]
            },
            {
                question: "(114) Enquanto pastor de ovelhas, Davi protegeu seu rebanho de dois animais perigosos. Quais?",
                answers: [
                    { text: "serpente e dromedário", correct: false },
                    { text: "urso e leão", correct: true },
                    { text: "cobra e lobo", correct: false },
                    { text: "urso e escorpião", correct: false }
                ]
            },
            {
                question: "(115) Quando bebê, como Moisés foi salvo do decreto infanticida do Faraó?",
                answers: [
                    { text: "Foi levado às pressas para fora do Egito", correct: false },
                    { text: "Foi escondido dentro de uma caverna", correct: false },
                    { text: "Foi colocado num cesto e lançado no rio", correct: true },
                    { text: "Foi levado ao templo para servir a Deus", correct: false }
                ]
            },
            {
                question: "(116) Quantos eram os discípulos mais próximos de Jesus?",
                answers: [
                    { text: "10", correct: false },
                    { text: "7", correct: false },
                    { text: "5", correct: false },
                    { text: "12", correct: true }
                ]
            },
            {
                question: "(117) Complete o versículo: 'Porque Deus tanto amou o mundo...'",
                answers: [
                    { text: "que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna.", correct: true },
                    { text: "que enviou seu filho ao mundo, para que o mundo fosse salvo por ele.", correct: false },
                    { text: "ao ponto de sermos chamados filhos seus, e de fato somos.", correct: false },
                    { text: "que veio para o que era seu, mas o seus não o receberam.", correct: false }
                ]
            },
            {
                question: "(118) Qual o nome da ilha onde João escreveu o livro de Apocalipse?",
                answers: [
                    { text: "Ilha de Creta", correct: false },
                    { text: "Ilha de Malta", correct: false },
                    { text: "Ilha de Patmos", correct: true },
                    { text: "Ilha de Pérgamo", correct: false }
                ]
            }
            {
              question: "(119) Qual o nome do jardim plantado por Deus para o 1º casal criado?",
              answers: [
                  { text: "Jardim do Getsêmani", correct: false },
                  { text: "Rosa de Sarom", correct: false },
                  { text: "Jardim do Éden", correct: true },
                  { text: "Paraíso", correct: false }
              ]
          },
          {
              question: "(120) Em quais livros da Bíblia é narrada a história do nascimento de Jesus?",
              answers: [
                  { text: "Gênesis e Salmos", correct: false },
                  { text: "Mateus e Marcos", correct: false },
                  { text: "Hebreus e Apocalipse", correct: false },
                  { text: "Mateus e Lucas", correct: true }
              ]
          },
          {
              question: "(121) Quantos casais humanos entraram na arca de Noé?",
              answers: [
                  { text: "4 casais", correct: true },
                  { text: "1 casal", correct: false },
                  { text: "6 casais", correct: false },
                  { text: "3 casais", correct: false }
              ]
          },
          {
              question: "(122) Qual dos discípulos negou a Jesus?",
              answers: [
                  { text: "Judas Iscariotes", correct: false },
                  { text: "João", correct: false },
                  { text: "Pedro", correct: true },
                  { text: "Bartolomeu", correct: false }
              ]
          },
          {
              question: "(123) Qual o nome da cidade fundada por Caim, depois que saiu da presença de Deus?",
              answers: [
                  { text: "Sodoma", correct: false },
                  { text: "Gomorra", correct: false },
                  { text: "Enoque", correct: true },
                  { text: "Canaã", correct: false }
              ]
          },
          {
              question: "(124) Deus mandou que Abraão olhasse para o quê, quando lhe fez uma promessa?",
              answers: [
                  { text: "Para o arco-íris no céu, símbolo da aliança com Abraão", correct: false },
                  { text: "Para a areia do mar, para que contasse os grãos de areia, se pudesse", correct: false },
                  { text: "Para as estrelas do céu, para que as contasse, se pudesse", correct: true },
                  { text: "Para a floresta da terra prometida, para contar as árvores frutíferas", correct: false }
              ]
          },
          {
              question: "(125) Judas traiu a Jesus por qual valor?",
              answers: [
                  { text: "30 moedas de prata", correct: true },
                  { text: "100 moedas de ouro", correct: false },
                  { text: "50 moedas de prata", correct: false },
                  { text: "30 moedas de ouro", correct: false }
              ]
          },
          {
              question: "(126) Quem eram os dois irmãos de Moisés?",
              answers: [
                  { text: "Esaú e Jacó", correct: false },
                  { text: "Miriã e Arão", correct: true },
                  { text: "Josué e Calebe", correct: false },
                  { text: "Priscila e Áquila", correct: false }
              ]
          },
          {
              question: "(127) Quem foi o juiz hebreu que Dalila seduziu para entregar ao exército filisteu?",
              answers: [
                  { text: "Sansão", correct: true },
                  { text: "Salomão", correct: false },
                  { text: "Samuel", correct: false },
                  { text: "Saul", correct: false }
              ]
          },
          {
              question: "(128) Como e onde aconteceu a conversão de Paulo?",
              answers: [
                  { text: "Foi chamado enquanto pescava junto de outros pescadores, no mar da Galiléia", correct: false },
                  { text: "Teve um sonho à noite, enquanto dormia na cidade de Tarso", correct: false },
                  { text: "Durante a pregação das Escrituras, na Sinagoga em Jerusalém", correct: false },
                  { text: "Teve uma visão depois de cair por terra, perto de Damasco", correct: true }
              ]
          },
            {
              question: "129. A Bíblia é composta por quantos livros?",
              answers: [
                { text: "A) 88 livros", correct: false },
                { text: "B) 37 livros", correct: false },
                { text: "C) 66 livros", correct: true },
                { text: "D) 100 livros", correct: false }
              ]
              
            },
            {
              question: "130. Qual o significado original da palavra 'Bíblia'?",
              answers: [
                { text: "A) Bíblia é o plural de 'biblos' do grego e significa livros", correct: true },
                { text: "B) Bíblia significa 'palavra escrita' no hebraico", correct: false },
                { text: "C) Bíblia era o nome hebraico das pedras dos 10 Mandamentos", correct: false },
                { text: "D) Bíblia é uma homenagem aos primeiros tradutores", correct: false }
              ]
              
            },
            {
              question: "131. De acordo com 2 Timóteo 3:16, toda a Escritura é:",
              answers: [
                { text: "A) ditada por Deus, letra por letra", correct: false },
                { text: "B) baseada nos sonhos dos profetas e apóstolos", correct: false },
                { text: "C) inspirada por Deus e útil para seus propósitos", correct: true },
                { text: "D) transcrita por anjos para ensinar aos homens", correct: false }
              ]
              
            },
            {
              question: "132. A Bíblia é dividida em:",
              answers: [
                { text: "A) 3 partes: Pentateuco, livros históricos e Evangelhos", correct: false },
                { text: "B) 2 partes: Antigo Testamento e Novo Testamento", correct: true },
                { text: "C) 3 partes: Velho Testamento, Salmos e Novo Testamento", correct: false },
                { text: "D) 2 partes: Livros da Lei e Apocalipse", correct: false }
              ]
              
            },
            {
              question: "133. Como a Bíblia foi escrita?",
              answers: [
                { text: "A) Ao longo do ministério de Jesus, os discípulos foram escrevendo", correct: false },
                { text: "B) Durante aproximadamente 100 anos, um grupo de 70 profetas escreveram", correct: false },
                { text: "C) Durante 5 séculos a Bíblia foi escrita por 70 escribas", correct: false },
                { text: "D) Ao longo de 1600 anos, 40 autores diferentes escreveram toda a Bíblia", correct: true }
              ]
              
            },
            {
              question: "134. Qual é o tema central da Bíblia?",
              answers: [
                { text: "A) Os heróis da fé e seus milagres", correct: false },
                { text: "B) Jesus Cristo", correct: true },
                { text: "C) A importância de buscar a Deus para prosperidade", correct: false },
                { text: "D) As vitórias de personagens bíblicos", correct: false }
              ]
              
            },
            {
              question: "135. Qual é o menor versículo da Bíblia?",
              answers: [
                { text: "A) João 11:35", correct: false },
                { text: "B) Ester 8:9", correct: false },
                { text: "C) Êxodo 20:13", correct: false },
                { text: "D) Jó 3:2", correct: true }
              ]
            },
            {
              question: "138. Qual é o maior e o menor capítulos da Bíblia?",
              answers: [
                { text: "A) Isaías 66 e Salmo 2", correct: false },
                { text: "B) Salmo 119 e Salmo 117", correct: true },
                { text: "C) Lamentações 3 e 2ª João", correct: false },
                { text: "D) Salmo 150 e Judas 1", correct: false }
              ]
              
            },
            {
              question: "137. Das seguintes afirmações qual não é correta?",
              answers: [
                { text: "A) A Bíblia foi o 1º livro impresso", correct: false },
                { text: "B) O Antigo Testamento possui 39 livros e o Novo 27", correct: false },
                { text: "C) A Bíblia é chamada de 'Palavra de Deus'", correct: false },
                { text: "D) Moisés foi o autor com menos livros escritos", correct: true }
              ]
             
            },
            {
              question: "138. A Bíblia foi escrita em quais línguas originais?",
              answers: [
                { text: "A) siríaco, hebraico e latim", correct: false },
                { text: "B) hebraico, aramaico e grego", correct: true },
                { text: "C) aramaico, persa e grego", correct: false },
                { text: "D) hebraico, macedônio e aramaico", correct: false }
              ]
             
            },
          
          
            {
              question: "139. Quem é Jesus Cristo?",
              answers: [
                { text: "A) Um dos profetas judeus, muito importante", correct: false },
                { text: "B) Um Mestre sábio que ensinou tudo sobre o amor", correct: false },
                { text: "C) Jesus é o Filho do Deus Vivo, o prometido Salvador do mundo", correct: true },
                { text: "D) Um guru curandeiro que ajudou muita gente no passado", correct: false }
              ]
            },
            {
              question: "140. Qual o nome da cidade onde Jesus nasceu?",
              answers: [
                { text: "A) Nazaré", correct: false },
                { text: "B) Belém", correct: true },
                { text: "C) Jerusalém", correct: false },
                { text: "D) Galiléia", correct: false }
              ]
            },
            {
              question: "141. Com que idade Jesus começou seu ministério?",
              answers: [
                { text: "A) Com aproximadamente 30 anos", correct: true },
                { text: "B) Com 18 anos", correct: false },
                { text: "C) Com 12 anos", correct: false },
                { text: "D) Com aproximadamente 7 anos", correct: false }
              ]
            },
            {
              question: "142. Quais devem ser as 3 atitudes dos seguidores de Jesus?",
              answers: [
                { text: "A) Mude de vida, ajude aos necessitados e aprenda a perdoar", correct: false },
                { text: "B) Arrependa-se, consagre-se, e leia toda a bíblia", correct: false },
                { text: "C) Siga-lhe, oferte todos seus recursos e pregue a multidões", correct: false },
                { text: "D) Negue-se a si mesmo, tome a sua cruz diariamente e siga-lhe", correct: true }
              ]
            },
            {
              question: "143. Sobre Jesus é ERRADO dizer:",
              answers: [
                { text: "A) Jesus pecou em poucas situações.", correct: false },
                { text: "B) Jesus Cristo é Deus.", correct: true },
                { text: "C) Jesus foi 100% humano.", correct: true },
                { text: "D) Jesus ressuscitou ao 3º dia.", correct: true }
              ]
            },
            {
              question: "144. Qual foi o primeiro milagre de Jesus?",
              answers: [
                { text: "A) Curou o cego Bartimeu à beira de um caminho", correct: false },
                { text: "B) Andou sobre as águas e também fez Pedro andar", correct: false },
                { text: "C) Multiplicou pães e peixes para uma multidão", correct: false },
                { text: "D) Transformou a água em vinho numa festa de casamento", correct: true }
              ]
            },
            {
              question: "145. Segundo Jesus, quais são os mandamentos mais importantes da Bíblia?",
              answers: [
                { text: "A) Não matar e guardar o sábado.", correct: false },
                { text: "B) Amar a Deus sobre todas as coisas e amar ao próximo como a si mesmo.", correct: true },
                { text: "C) Obedecer a Deus cumprindo os 10 mandamentos e batizar", correct: false },
                { text: "D) Buscar o Reino de Deus e fazer justiça", correct: false }
              ]
            },
            {
              question: "146. O nome de Jesus é o nome acima de todos os nomes. Cristo significa:",
              answers: [
                { text: "A) O sobrenome que Jesus recebeu da família de José", correct: false },
                { text: "B) 'Ungido', 'consagrado' do grego, equivalente a 'Messias' no hebraico", correct: true },
                { text: "C) Um nome da família de Maria", correct: false },
                { text: "D) Um título hebraico que significa: Rei dos judeus", correct: false }
              ]
            },
            {
              question: "147. Qual parábola ensinada por Jesus fala sobre o perdão de Deus?",
              answers: [
                { text: "A) Parábola do Joio e do trigo", correct: false },
                { text: "B) Parábola das Dez virgens", correct: false },
                { text: "C) Parábola do Filho Pródigo", correct: true },
                { text: "D) Parábola do Bom Samaritano", correct: false },
                
              ]
            },
            {
              question: "148. Que sinais aconteceram enquanto Jesus estava na cruz?",
              answers: [
                { text: "A) Pessoas foram curadas; terremoto dividiu a terra; eclipse lunar", correct: false },
                { text: "B) O sol escureceu; o véu do templo se rasgou; houve terremoto e rochas se partiram", correct: true },
                { text: "C) O centurião se converteu, um dos ladrões crucificados ressuscitou, o véu do templo se rasgou", correct: false },
                { text: "D) O tempo parou por 3 horas, pessoas foram curadas, mortos ressuscitaram nos sepulcros", correct: false }
              ]
            }];
          
                  
          
          
           
       
           
