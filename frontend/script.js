const PrimeiraMensagem = [
  'Para avançar basta clicar na tela.',
  'Bhrenda, você é a minha escolha no dia de hoje, de amanha e em todos os proximos, eu te amo.',
  'As proximas palavras são simples... mas que eu "falo" do fundo do meu coração, no intuito de te deixar mais feliz'
];

let clickCount = 0;

async function buscarFraseDaIA() {
  const fraseEl = document.getElementById("Frases_Tela");
  fraseEl.textContent = "Espero que goste...";

  try {
    const response = await fetch('https://frases-ia-backend.onrender.com/gerar-frase')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.frase) {

      fraseEl.innerHTML = data.frase.replace(/\n/g, '<br>');
    }
    else if (data.error) {
      fraseEl.textContent = "Erro da IA: " + data.error;
    }
    else {
      fraseEl.textContent = "Resposta vazia da IA.";
    }
  }
    catch (error) {
      async function buscarFraseDaIA() {
  try {
    const response = await fetch("https://SEU-BACKEND.onrender.com/gerar-frase");

    if (!response.ok) {
      throw new Error("Erro ao buscar frase");
    }

    const data = await response.json();
    console.log(data.frase);

  } catch (err) {
    console.error("Erro ao buscar frase da IA:", err);
  }
}

  }
}

document.addEventListener("click", () => {
  const fraseEl = document.getElementById("Frases_Tela");

  // Mensagens iniciais obrigatórias
  if (clickCount < PrimeiraMensagem.length) {
    fraseEl.textContent = PrimeiraMensagem[clickCount];
    clickCount++;
    return;
  }

  // Momento da foto do doguinho
  if (clickCount === PrimeiraMensagem.length) {
    fraseEl.innerHTML = "";
    const img = document.createElement("img");
    img.src = "./dog-love.jpg";
    img.style.width = "600px";
    img.style.borderRadius = "12px";
    fraseEl.appendChild(img);
    clickCount++;
    return;
  }

  // chama a IA
  buscarFraseDaIA();

});