# 🎮 ByteLife — Life Simulator Web

**ByteLife** é um jogo de simulação de vida baseado em texto inspirado no clássico BitLife, desenvolvido em **React + Vite + Tailwind CSS** e rodando 100% no navegador (*client-side*).

---

## 🌟 Funcionalidades Principais

- **Criação Procedural de Personagem:**
  - Nomes, nacionalidades, pais com idades e atributos gerados aleatoriamente a cada nova partida.
  - 4 Atributos principais: **Felicidade**, **Saúde**, **Inteligência** e **Aparência**.

- **Loop de Idade (+1 Ano):**
  - Avanço cronológico de idade.
  - Rendimentos de trabalho, despesas de faculdade e custos anuais de manutenção de veículos e imóveis.
  - Envelhecimento dinâmico e falecimento de familiares.
  - Eventos de vida contextuais (infância, juventude, vida adulta e velhice).

- **5 Módulos Interativos:**
  1. **Diário / Life Log:** Feed cronológico detalhado com rolagem suave automática.
  2. **Carreira / Ocupação:** Sistema escolar, vestibulares universitários (Ciência da Computação, Medicina, Administração, Direito) e quadro de vagas com salários progressivos e ações corporativas (*Trabalhar duro*, *Pedir aumento*, *Demissão*).
  3. **Relacionamentos:** Lista de pais, cônjuges e namorados(as) com interações (*Conversar*, *Elogiar*, *Passar tempo*, *Pedir dinheiro*, *Procurar amor*, *Casar-se*, *Terminar*).
  4. **Atividades & Lazer:**
     - *Academia*: Eleva Saúde e Aparência.
     - *Biblioteca*: Eleva Inteligência.
     - *Consulta Médica*: Restaura Saúde a 100%.
     - *Loteria*: Bilhetes com sorteio real de acumulado ($1.000.000).
     - *Crimes*: Furto com risco de prisão por 3 anos.
  5. **Ativos & Patrimônio:** Compra e venda de veículos (motoneta, hatch, sedan, SUV, supercarro) e imóveis (quitinete, apartamento, casa, mansão).

- **Persistência de Dados (Save Local):**
  - O estado do jogo é salvo automaticamente no `localStorage` a cada ação ou ano avançado.
  - Botão de **"Nova Vida"** para reiniciar o jogo com diálogo de confirmação.

- **Tela de Morte e Resumo:**
  - Lápide memorial exibindo idade final, causa do falecimento e patrimônio líquido acumulado.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm**

### Passos
1. Instalar as dependências:
   ```bash
   npm install
   ```

2. Executar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Gerar o build estático para produção:
   ```bash
   npm run build
   ```

---

## 🌐 Publicação no GitHub Pages

O projeto inclui um workflow automatizado em `.github/workflows/deploy.yml` que realiza o build e publica o jogo diretamente no GitHub Pages a cada push na branch `main`.

---

## 🛠️ Stack Tecnológica

- **React 19**
- **Vite**
- **Tailwind CSS**
- **Lucide React** (ícones)
- **Canvas-Confetti** (efeitos de vitória)
