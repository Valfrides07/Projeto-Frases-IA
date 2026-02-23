Projeto: Gerador de Frases Românticas com Gemini AI

📝 Descrição do Projeto

Este projeto é uma aplicação web dedicada a gerar frases românticas, utilizando a inteligência artificial do Google Gemini. A aplicação é dividida em duas partes: um Backend em Node.js/Express que se comunica com a API do Gemini e um Frontend em HTML, CSS e JavaScript puro que exibe as mensagens e interage com o usuário.

O projeto combina mensagens pessoais pré-definidas, um momento especial com uma imagem e a geração dinâmica de conteúdo via IA.

✨ Funcionalidades

• Mensagens Iniciais Personalizadas: Exibe uma sequência de mensagens pessoais e carinhosas ao iniciar.

• Momento "Doguinho": Exibe uma imagem especial (dog-love.jpg) após as mensagens iniciais.

• Geração de Frases Românticas: A cada clique subsequente, o sistema chama a API do Backend para gerar uma nova frase romântica e exclusiva, garantindo variedade e criatividade.

• Configuração de IA Otimizada: Utiliza a systemInstruction para garantir que o modelo Gemini responda APENAS com a frase desejada, sem introduções ou textos extras.

🛠️ Tecnologias Utilizadas

Componente
Tecnologia
Descrição
Backend
Node.js, Express
Servidor leve para expor a API de geração de frases.
API
Google Generative AI (Gemini)
Utilizado para a geração de conteúdo criativo e romântico.
Frontend
HTML, CSS, JavaScript
Interface simples e interativa para o usuário.

⚙️ Configuração e Execução

O projeto é composto por dois módulos que devem ser executados separadamente: o Backend (API) e o Frontend (Interface Web).

1. Configuração do Backend (Node.js)

O Backend é responsável por hospedar o endpoint que se comunica com a API do Google Gemini.

Código (server.js)

JavaScript


const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Chave da API -> mandar para o .env
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.get('/gerar-frase', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({

       // Versão mais recente e estável em 2026. Se erro, troque por "gemini-1.5-pro-latest".
      model: "gemini-2.5-flash",
      
       // Instrução de sistema: mais forte que prompt.
      systemInstruction: "Você é um gerador de frases românticas. Responda APENAS com UMA frase, doce e única para a Bhrenda a minha namorada. NÃO inclua introduções, listas, números, explicações ou qualquer texto extra. Varie a frase a cada resposta.",
      
      generationConfig: {
        maxOutputTokens: 250, // Limita o output pra ~1 frase curta (evita listas).

        temperature: 0.9 // Aumenta criatividade pra variar, mas mantenha <1 pra não divagar.
      }
    });

     // Prompt simples agora, já que systemInstruction controla.
    const prompt = "Gere uma frase romântica para a Bhrenda.";

    const result = await model.generateContent(prompt);
    const frase = result.response.text().trim();

    res.json({ frase });
  } 
    catch (error) {
      console.error("Erro na API:", error);
      res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Sucesso ao conectar o servidor em http://localhost:${port}` );
});


Passos para Rodar

1. Instale as dependências: Bash

npm install express cors @google/generative-ai dotenv

2. Crie um arquivo .env na raiz do projeto para sua chave de API: Plain Text

GOOGLE_API_KEY="SUA_CHAVE_DE_API_AQUI"

3. Execute o servidor: Bash

# Se estiver usando 'dotenv' no seu código, use:
node server.js

# Se estiver exportando a variável manualmente:
export GOOGLE_API_KEY="SUA_CHAVE_DE_API_AQUI"
node server.js

O servidor estará rodando em http://localhost:3000.

2. Configuração do Frontend (HTML/JS )

O Frontend é a interface que o usuário interage.

Código JavaScript (Assumindo que está em um arquivo como script.js)

JavaScript

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
    // Alterar esta URL para o endereço onde seu backend está rodando
    // Se estiver rodando localmente, usar: 'http://localhost:3000/gerar-frase'
    const response = await fetch('https://frases-ia-backend.onrender.com/gerar-frase' )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.frase) {

      fraseEl.innerHTML = data.frase.replace(/\n/g, '  
');
    }
    else if (data.error) {
      fraseEl.textContent = "Erro da IA: " + data.error;
    }
    else {
      fraseEl.textContent = "Resposta vazia da IA.";
    }
  }
    catch (error) {
      // O bloco catch do seu código original estava incompleto/incorreto.
      // Foi mantido o bloco original, mas é recomendado simplificar para:
      fraseEl.textContent = "Erro de conexão com o servidor. Verifique se o Backend está ativo.";
      console.error("Erro ao buscar frase da IA:", error);
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


Estrutura HTML (Exemplo Básico)

Você precisará de um arquivo index.html que inclua o elemento com o ID Frases_Tela e o arquivo JavaScript.

HTML


<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Para Bhrenda</title>
    <style>
        /* Adicione seu CSS aqui para centralizar e estilizar */
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: sans-serif;
            text-align: center;
            cursor: pointer; /* Indica que a tela é clicável */
        }
        #Frases_Tela {
            font-size: 2em;
            max-width: 80%;
        }
    </style>
</head>
<body>
    <div id="Frases_Tela">
        Clique para começar...
    </div>
    
    <!-- Certifique-se de que o nome do arquivo JS está correto -->
    <script src="script.js"></script> 
</body>
</html>


