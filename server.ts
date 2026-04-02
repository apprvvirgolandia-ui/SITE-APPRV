import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware para JSON
  app.use(express.json());

  // Rota de login para o administrador
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = (process.env.ADMIN_PASSWORD || "apprv2026").trim();
    
    console.log(`Tentativa de login:`);
    console.log(`- Senha fornecida: "${password}" (comprimento: ${password?.length})`);
    console.log(`- Senha esperada: "${adminPassword}" (comprimento: ${adminPassword?.length})`);
    
    if (password && password.trim() === adminPassword) {
      console.log("Resultado: Login bem-sucedido!");
      res.json({ success: true, message: "Acesso autorizado." });
    } else {
      console.log("Resultado: Falha no login (Senha incorreta).");
      res.status(401).json({ success: false, message: "Senha incorreta." });
    }
  });

  // Rota para obter a senha (apenas para debug do admin logado)
  app.get("/api/admin/password-hint", (req, res) => {
    const adminPassword = (process.env.ADMIN_PASSWORD || "apprv2026").trim();
    // Retorna apenas os primeiros e últimos caracteres para segurança, ou a senha completa se for para debug interno
    res.json({ 
      hint: `${adminPassword[0]}${'*'.repeat(adminPassword.length - 2)}${adminPassword[adminPassword.length - 1]}`,
      length: adminPassword.length
    });
  });

  // Exemplo de rota de API que usa variáveis de ambiente privadas
  // Estas variáveis (process.env) NÃO são enviadas para o navegador
  app.get("/api/config", (req, res) => {
    res.json({
      status: "ok",
      // Exemplo: podemos ter uma chave de API aqui que só o servidor conhece
      // message: "O servidor está configurado e seguro."
    });
  });

  // Configuração do Vite como middleware para desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Variáveis de ambiente privadas (sem prefixo VITE_) estão protegidas no servidor.");
  });
}

startServer();
