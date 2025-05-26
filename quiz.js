const phaseLimits = [10, 30, 60];
let currentPhase = 1;
let currentIndex = 0;
let score = 0;
let currentQuestions = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const phaseInfo = document.getElementById("phase-info");
const nextPhaseBtn = document.getElementById("next-phase-btn");

document.getElementById("start-btn").addEventListener("click", () => {
  const nome = document.getElementById("usuario").value.trim();
  if (!nome) {
    alert("Digite seu nome para começar o quiz.");
    return;
  }
  localStorage.setItem("usuario", nome);
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  startPhase(1);
});

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startPhase(phase) {
  currentPhase = phase;
  phaseInfo.textContent = `Fase ${phase}`;
  const start = phase === 1 ? 0 : phaseLimits[phase - 2];
  const end = phaseLimits[phase - 1];
  currentQuestions = allQuestions.slice(start, end);
  shuffleArray(currentQuestions);
  currentIndex = 0;
  score = 0;
  resultEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  nextPhaseBtn.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  const question = currentQuestions[currentIndex];
  if (!question || !question.question || !question.answers) {
    questionEl.textContent = "❌ Pergunta inválida.";
    return;
  }

  questionEl.textContent = question.question;
  answersEl.innerHTML = "";
  question.answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.textContent = ans.text;
    btn.onclick = () => handleAnswer(ans.correct);
    answersEl.appendChild(btn);
  });
}

function handleAnswer(correct) {
  if (correct) score++;
  nextBtn.classList.remove("hidden");
  Array.from(answersEl.children).forEach((btn) => (btn.disabled = true));
}

nextBtn.onclick = () => {
  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    nextBtn.classList.add("hidden");
    showQuestion();
  } else {
    resultEl.classList.remove("hidden");
    resultEl.textContent = `Fim da fase ${currentPhase}! Pontuação: ${score}/${currentQuestions.length}`;
    if (currentPhase < 3) {
      nextPhaseBtn.classList.remove("hidden");
    } else {
      alert("🎉 Você concluiu todas as fases!");
    }
    nextBtn.classList.add("hidden");

    if (score > 0) salvarProgresso();
  }
};

nextPhaseBtn.onclick = () => {
  if (currentPhase < 3) {
    startPhase(currentPhase + 1);
  } else {
    alert("🎉 Fim do quiz! Parabéns!");
  }
};

async function salvarProgresso() {
  const usuario = localStorage.getItem("usuario") || document.getElementById("usuario").value.trim();
  if (!usuario) {
    alert("Digite seu nome para salvar o progresso.");
    return;
  }

  // Buscar progresso atual do usuário
  let progressoAtual = { fase1: 0, fase2: 0, fase3: 0 };
  try {
    const resposta = await fetch(`https://quizbiblico-production.up.railway.app/progresso?usuario=${encodeURIComponent(usuario)}`);
    if (resposta.ok) {
      const dados = await resposta.json();
      progressoAtual.fase1 = dados.fase1 ?? 0;
      progressoAtual.fase2 = dados.fase2 ?? 0;
      progressoAtual.fase3 = dados.fase3 ?? 0;
    }
  } catch (err) {
    console.warn("🔍 Nenhum progresso anterior encontrado.");
  }

  // Atualiza a fase atual com o novo score
  progressoAtual[`fase${currentPhase}`] = score;

  const progresso = {
    usuario,
    fase1: progressoAtual.fase1,
    fase2: progressoAtual.fase2,
    fase3: progressoAtual.fase3,
    total: progressoAtual.fase1 + progressoAtual.fase2 + progressoAtual.fase3,
  };

  try {
    const resposta = await fetch("https://quizbiblico-production.up.railway.app/progresso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progresso),
    });

    const dados = await resposta.json();
    if (resposta.ok) {
      alert(dados.mensagem);
    } else {
      alert(`Erro ao salvar: ${dados.mensagem}`);
      console.error("❌ Resposta do servidor:", dados);
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor.");
    console.error("Erro:", error);
  }
}

async function consultarProgresso() {
  const usuario = document.getElementById("usuario").value.trim();
  if (!usuario) {
    alert("Digite o nome do usuário para consultar o progresso.");
    return;
  }

  try {
    const resposta = await fetch(`https://quizbiblico-production.up.railway.app/progresso?usuario=${encodeURIComponent(usuario)}`);
    const dados = await resposta.json();

    if (resposta.ok) {
      const fase1 = dados.fase1 ?? 0;
      const fase2 = dados.fase2 ?? 0;
      const fase3 = dados.fase3 ?? 0;
      const total = fase1 + fase2 + fase3;

      document.getElementById("progresso-info").innerHTML = `
        <strong>📌 Progresso atual:</strong><br>
        👤 Usuário: ${dados.usuario}<br>
        🌟 Fase 1: ${fase1}/10<br>
        🌟 Fase 2: ${fase2}/20<br>
        🌟 Fase 3: ${fase3}/30<br>
        🔢 Total: ${total}/60 pontos
      `;
    } else {
      alert(`Erro: ${dados.mensagem}`);
    }
  } catch (error) {
    alert("Erro ao consultar o progresso.");
    console.error("Erro:", error);
  }
}

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(reg => console.log("✅ Service Worker registrado!", reg))
      .catch(err => console.error("❌ Erro no Service Worker:", err));
  });
}
