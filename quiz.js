
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

function startGame(){
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
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

    let timeLeft = 20
    $timeText.textContent = `Tempo restante: ${timeLeft}s`

    $timerBar.style.transition = 'none'
    $timerBar.style.width = '100%'

    setTimeout(() => {
        $timerBar.style.transition = 'width 15s linear'
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
    }, 15000)
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
        <p class="final-message">Você acertou ${totalCorrect} de ${totalQuestion} questões! 
        <span>Resultado: ${message}</span></p>
        <button onclick="window.location.reload()" class="button">Refazer teste</button>
    `
}

const questions = [
    {
        question: "(1) A quem Paulo chamou de 'meu companheiro de lutas'? (Referência bíblica: Filemom 1:2)",
        answers: [
            { text: "Apolo", correct: false },
            { text: "Afia", correct: false },
            { text: "Arquipo", correct: true },
            { text: "Adonias", correct: false }
        ]
    },
    {
        question: "(2) Quais discípulos perguntaram a Jesus se podiam fazer descer fogo do céu? (Referência bíblica: Lucas 9:54)",
        answers: [
            { text: "João e Tiago", correct: true },
            { text: "Pedro e João", correct: false },
            { text: "Tiago e Pedro", correct: false },
            { text: "Tiago e Mateus", correct: false }
        ]
    },














   {
    question: "(1) A quem Paulo chamou de 'meu companheiro de lutas (Referencia biblica filemon 1:2.)",
    
    answers:[
        {text:"Apolo", correct: false },
        {text: "Afia", correct: false },
        {text: "Arquipo ", correct: true},
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
               {text:"",correct: false}
            
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
            question:'(31) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(32) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(33) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(34) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(35) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(36) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(37) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(38) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(39) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(40) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(41) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(42) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(43) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(44) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(45) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(46) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(47) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(48) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(49) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(50) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(51) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(52) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(53) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(54) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(55) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(56) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(57) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(58) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(59) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(60) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(61) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(62) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            {
            question:'(63) Na visão profética de João, qual era o número de cavaleiros do Apocalpse?',
            answers:[
               { text:'7', correct: false},
               {text:'6', correct: false},
               {text:'5', correct: false},
               {text:"4",correct: true}
            
            ]},
            
]
