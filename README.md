# 🤖 GLPI-bot / Bot de Formalização de Chamados - Discord + Gemini  

Um bot do Discord que formaliza chamados de TI utilizando a API do **Gemini AI**, permitindo transformar descrições simples em chamados bem estruturados.

---

## 📌 Funcionalidades  
✅ **Formalização de Chamados:** Transforma descrições de problemas em chamados bem estruturados.  
✅ **Comando Slash `/solicitacao`**: Usuários podem gerar chamados diretamente no Discord.  
✅ **Integração com Gemini AI**: Utiliza IA para padronizar e organizar as informações.  

---

## 🚀 Como Configurar  

### 1️⃣ Clonar o Repositório  
```sh
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio

### 2️⃣ Instalar Dependências
```sh
npm install

### 3️⃣ Configurar Variáveis de Ambiente
DISCORD_TOKEN=seu_token_aqui
GEMINI_API_KEY=sua_chave_gemini_aqui
CLIENTE_ID=seu_cliente_id_aqui
GUILD_ID=seu_id_de_canal_aqui

### 4️⃣ Rodar o Bot
```sh
nodex index.js

## Comandos disponíveis (até então)
| Comando            | Descrição |
|--------------------|-----------|
| `/solicitacao` | Gera um chamado de solicitação formalizado com base na descrição fornecida. |
| `/formaliza` | Gera um chamado formalizado com base na descrição fornecida. |


## 🛠️ Tecnologias Utilizadas  

- [Node.js](https://nodejs.org/)  
- [Discord.js](https://discord.js.org/)  
- [Axios](https://axios-http.com/)  
- [Gemini AI](https://ai.google.dev/)  

---

## 📜 Exemplo de Uso  

### 🔹 Comando no Discord:  
```bash
/solicitacao resumo: "O setor de RH está com problema no sistema de ponto eletrônico."
🔹 Resposta do Bot:

📌 **Chamado Formalizado:**  
Título: Problema no Ponto Eletrônico - RH  
Empresa: [Nome da Empresa]  
Setor: Recursos Humanos  
Solicitante: [Nome]  
Descrição: O setor de RH relatou falhas no ponto eletrônico, impossibilitando o registro de entrada e saída dos funcionários.  
Ações realizadas: Reinicialização do sistema, sem sucesso.  
Ações necessárias: Verificação dos logs e contato com o fornecedor.  

