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
  console.log(`Sucesso ao conectar o servidor em http://localhost:${port}`);
});