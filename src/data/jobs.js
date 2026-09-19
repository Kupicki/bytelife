export const JOBS = [
  {
    id: "attendant",
    title: "Atendente de Fast Food",
    category: "Geral",
    minAge: 18,
    minIntelligence: 10,
    salary: 18000,
    description: "Atendimento ao cliente e preparo de refeições rápidas."
  },
  {
    id: "cashier",
    title: "Caixa de Supermercado",
    category: "Comércio",
    minAge: 18,
    minIntelligence: 20,
    salary: 21000,
    description: "Operação de caixa e registro de compras."
  },
  {
    id: "driver",
    title: "Motorista de Aplicativo",
    category: "Transporte",
    minAge: 18,
    minIntelligence: 25,
    salary: 28000,
    description: "Transporte de passageiros pela cidade."
  },
  {
    id: "receptionist",
    title: "Recepcionista",
    category: "Administração",
    minAge: 18,
    minIntelligence: 30,
    salary: 26000,
    description: "Atendimento telefônico e recepção de visitantes."
  },
  {
    id: "sales_rep",
    title: "Vendedor Técnico",
    category: "Vendas",
    minAge: 18,
    minIntelligence: 45,
    salary: 42000,
    description: "Prospecção e fechamento de negócios comerciais."
  },
  {
    id: "jr_developer",
    title: "Desenvolvedor Júnior",
    category: "Tecnologia",
    minAge: 18,
    minIntelligence: 55,
    requiresUniversity: true,
    universityDegree: "Ciência da Computação",
    salary: 58000,
    description: "Desenvolvimento de software e correção de bugs."
  },
  {
    id: "nurse",
    title: "Enfermeiro(a)",
    category: "Saúde",
    minAge: 21,
    minIntelligence: 50,
    requiresUniversity: true,
    universityDegree: "Medicina/Enfermagem",
    salary: 52000,
    description: "Cuidados médicos e acompanhamento de pacientes."
  },
  {
    id: "accountant",
    title: "Contador",
    category: "Finanças",
    minAge: 21,
    minIntelligence: 60,
    requiresUniversity: true,
    universityDegree: "Administração/Finanças",
    salary: 62000,
    description: "Gestão contábil e balanços financeiros."
  },
  {
    id: "sr_developer",
    title: "Engenheiro de Software Senior",
    category: "Tecnologia",
    minAge: 23,
    minIntelligence: 75,
    requiresUniversity: true,
    universityDegree: "Ciência da Computação",
    salary: 120000,
    description: "Arquitetura de sistemas e liderança técnica."
  },
  {
    id: "doctor",
    title: "Médico Especialista",
    category: "Saúde",
    minAge: 25,
    minIntelligence: 80,
    requiresUniversity: true,
    universityDegree: "Medicina/Enfermagem",
    salary: 180000,
    description: "Diagnóstico avançado e cirurgias."
  },
  {
    id: "executive",
    title: "Diretor Executivo (CEO)",
    category: "Executivo",
    minAge: 28,
    minIntelligence: 85,
    requiresUniversity: true,
    salary: 350000,
    description: "Gestão estratégica global de grandes corporações."
  }
];

export const UNIVERSITIES = [
  {
    id: "cs",
    name: "Ciência da Computação",
    costYear: 12000,
    years: 4,
    minIntelligence: 50
  },
  {
    id: "medicine",
    name: "Medicina/Enfermagem",
    costYear: 25000,
    years: 6,
    minIntelligence: 70
  },
  {
    id: "business",
    name: "Administração/Finanças",
    costYear: 15000,
    years: 4,
    minIntelligence: 45
  },
  {
    id: "law",
    name: "Direito",
    costYear: 18000,
    years: 5,
    minIntelligence: 60
  }
];
