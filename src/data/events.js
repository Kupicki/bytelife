export const AGE_EVENTS = [
  {
    id: "baby_vaccine",
    minAge: 1,
    maxAge: 3,
    title: "Hora da Vacina",
    description: "Sua mãe levou você ao posto de saúde para tomar a vacina anual. O que você faz?",
    options: [
      {
        text: "Chorar escandalosamente",
        effects: { happiness: -5, health: 5 },
        log: "Você chorou muito ao tomar a vacina, mas ficou protegido contra doenças."
      },
      {
        text: "Ficar corajoso e quieto",
        effects: { happiness: 10, health: 10 },
        log: "Você levou a picada de vacina sem dar um piu! Seus pais se orgulharam."
      },
      {
        text: "Tentar morder o enfermeiro",
        effects: { happiness: -10, health: 0 },
        log: "Você tentou morder o enfermeiro e levou uma bronca dos seus pais."
      }
    ]
  },
  {
    id: "first_words",
    minAge: 2,
    maxAge: 4,
    title: "Primeiras Palavras",
    description: "Seus pais estão tentando ensinar você a falar.",
    options: [
      {
        text: "Tentar dizer 'Mamãe' / 'Papai'",
        effects: { happiness: 10, intelligence: 5 },
        log: "Você falou 'Mamãe/Papai' e a família inteira comemorou!"
      },
      {
        text: "Fazer barulhos de dinossauro",
        effects: { happiness: 15, intelligence: 2 },
        log: "ROAAR! Você preferiu imitar um T-Rex."
      }
    ]
  },
  {
    id: "sandbox_play",
    minAge: 3,
    maxAge: 5,
    title: "Parquinho Infantil",
    description: "Outra criança no parquinho pegou seu brinquedo favorito.",
    options: [
      {
        text: "Compartilhar e brincar juntos",
        effects: { happiness: 10, intelligence: 5 },
        log: "Você fez um novo amigo no parquinho."
      },
      {
        text: "Puxar de volta e dar uma empurrada",
        effects: { happiness: -5, look: 0 },
        log: "A confusão rendeu uma bronca no parque."
      }
    ]
  },
  {
    id: "school_bully",
    minAge: 8,
    maxAge: 13,
    title: "Valente da Escola",
    description: "Um colega de classe está implicando com você no recreio.",
    options: [
      {
        text: "Ignorar e contar ao professor",
        effects: { intelligence: 5, happiness: -2 },
        log: "A coordenação interveio e o valentão foi suspenso."
      },
      {
        text: "Enfrentar o colega no soco",
        effects: { health: -10, look: -5, happiness: 10 },
        log: "A briga foi feia! Você ficou com o olho roxo, mas ganhou respeito."
      },
      {
        text: "Fazer uma piada e desarmar a situação",
        effects: { intelligence: 10, happiness: 10 },
        log: "Seu bom humor transformou a provocação em risadas."
      }
    ]
  },
  {
    id: "first_crush",
    minAge: 13,
    maxAge: 16,
    title: "Primeira Paixão",
    description: "Você sente borboletas no estômago toda vez que vê um colega de classe.",
    options: [
      {
        text: "Mandar uma carta anônima",
        effects: { happiness: 5, intelligence: 2 },
        log: "Você enviou um bilhetinho secreto no meio da aula de história."
      },
      {
        text: "Chamar para tomar um sorvete",
        effects: { happiness: 15, look: 5 },
        log: "Vocês tomaram sorvete juntos e foi incrível!"
      },
      {
        text: "Esconder os sentimentos por timidez",
        effects: { happiness: -5 },
        log: "Você preferiu guardar o segredo só para você."
      }
    ]
  },
  {
    id: "driver_license",
    minAge: 17,
    maxAge: 18,
    title: "Exame de Habilitação",
    description: "Chegou a hora de fazer a prova prática de motorista!",
    options: [
      {
        text: "Estudar e praticar bastante a baliza",
        effects: { intelligence: 10, happiness: 15 },
        log: "Aprovado de primeira! Você conquistou sua carteira de motorista."
      },
      {
        text: "Tentar fazer sem estudar",
        effects: { intelligence: -5, happiness: -10 },
        log: "Você bateu no cone durante a baliza e foi reprovado."
      }
    ]
  },
  {
    id: "investment_scam",
    minAge: 20,
    maxAge: 60,
    title: "Oportunidade Mágica",
    description: "Um conhecido ofereceu um investimento misterioso que promete dobrar seu dinheiro em 1 semana.",
    options: [
      {
        text: "Recusar educadamente",
        effects: { intelligence: 5 },
        log: "Mais tarde descobriu-se que era um golpe financeiro. Boa esquivada!"
      },
      {
        text: "Investir $1.000",
        effects: { money: -1000, happiness: -15 },
        log: "Era um golpe! O conhecido desapareceu com seus $1.000."
      }
    ]
  },
  {
    id: "street_dog",
    minAge: 18,
    maxAge: 70,
    title: "Cão Abandonado",
    description: "Você encontrou um cachorrinho simpático encharcado pela chuva na rua.",
    options: [
      {
        text: "Adotar e levar para casa",
        effects: { happiness: 20, money: -300 },
        log: "Você adotou o cachorrinho! Ele se tornou seu amigo leal."
      },
      {
        text: "Levar a um abrigo de animais",
        effects: { happiness: 5 },
        log: "Você garantiu que o animalzinho ficasse em um local seguro."
      },
      {
        text: "Apenas passar direto",
        effects: { happiness: -5 },
        log: "Você seguiu seu caminho sentindo uma ligeira pontada de culpa."
      }
    ]
  },
  {
    id: "health_checkup",
    minAge: 35,
    maxAge: 85,
    title: "Sinal do Corpo",
    description: "Sua coluna anda doendo bastante ultimamente.",
    options: [
      {
        text: "Ir ao fisioterapeuta e praticar alongamento",
        effects: { health: 15, money: -200 },
        log: "O tratamento aliviou as dores nas costas."
      },
      {
        text: "Tomar analgésicos e ignorar",
        effects: { health: -10 },
        log: "A dor só piorou com o tempo."
      }
    ]
  }
];

export const RANDOM_EVENTS = [
  "Ganhou $100 em uma raspadinha de rua!",
  "Encontrou uma nota de $50 caída no chão.",
  "Pegou um resfriado fraco e descansou no fim de semana.",
  "Assistiu a uma série sensacional na TV.",
  "Fez uma caminhada agradável no parque local.",
  "Comprou uma roupa nova e se sentiu bem atraente."
];
