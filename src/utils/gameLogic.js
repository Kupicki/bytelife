import { MALE_NAMES, FEMALE_NAMES, SURNAMES, LOCATIONS } from '../data/names.js';
import { JOBS, UNIVERSITIES } from '../data/jobs.js';
import { AGE_EVENTS, RANDOM_EVENTS } from '../data/events.js';

const STORAGE_KEY = 'BYTELIFE_GAME_STATE_V1';

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCharacter() {
  const gender = Math.random() > 0.5 ? 'Masculino' : 'Feminino';
  const firstNameList = gender === 'Masculino' ? MALE_NAMES : FEMALE_NAMES;
  const firstName = getRandomChoice(firstNameList);
  const surname = getRandomChoice(SURNAMES);
  const name = `${firstName} ${surname}`;

  const locationData = getRandomChoice(LOCATIONS);
  const country = locationData.country;
  const city = getRandomChoice(locationData.cities);

  const happiness = getRandomInt(60, 95);
  const health = getRandomInt(70, 100);
  const intelligence = getRandomInt(40, 90);
  const look = getRandomInt(30, 95);

  const fatherAge = getRandomInt(20, 38);
  const motherAge = getRandomInt(20, 36);
  const fatherSurname = getRandomChoice(SURNAMES);
  const motherSurname = getRandomChoice(SURNAMES);

  const parents = [
    {
      id: 'father',
      relation: 'Pai',
      name: `${getRandomChoice(MALE_NAMES)} ${fatherSurname}`,
      age: fatherAge,
      relationship: getRandomInt(60, 95),
      alive: true
    },
    {
      id: 'mother',
      relation: 'Mãe',
      name: `${getRandomChoice(FEMALE_NAMES)} ${motherSurname}`,
      age: motherAge,
      relationship: getRandomInt(60, 95),
      alive: true
    }
  ];

  const initialLog = [
    {
      age: 0,
      text: `Nasci em ${city}, ${country}. Meu nome é ${name}.`
    }
  ];

  return {
    name,
    gender,
    country,
    city,
    age: 0,
    happiness,
    health,
    intelligence,
    look,
    bankBalance: 0,
    job: null,
    university: null,
    isDead: false,
    deathCause: null,
    inPrison: false,
    prisonYearsLeft: 0,
    relationships: parents,
    assets: [],
    logs: initialLog,
    activeEvent: null
  };
}

export function loadSavedGame() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load saved state', e);
  }
  return null;
}

export function saveGame(state) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state', e);
  }
}

export function clearSavedGame() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear saved state', e);
  }
}

export function clampStat(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function ageUp(state) {
  if (state.isDead) return state;

  const newState = { ...state };
  newState.age += 1;

  let yearLogs = [];

  if (newState.inPrison) {
    newState.prisonYearsLeft -= 1;
    newState.happiness = clampStat(newState.happiness - 10);
    newState.health = clampStat(newState.health - 5);
    if (newState.prisonYearsLeft <= 0) {
      newState.inPrison = false;
      yearLogs.push(`Idade ${newState.age}: Cumpri minha pena e fui libertado da prisão!`);
    } else {
      yearLogs.push(`Idade ${newState.age}: Cumpri mais 1 ano na prisão. Restam ${newState.prisonYearsLeft} ano(s).`);
    }
  } else {
    if (newState.age === 6) {
      yearLogs.push(`Idade ${newState.age}: Iniciei a escola primária.`);
    } else if (newState.age === 18 && !newState.university && !newState.job) {
      yearLogs.push(`Idade ${newState.age}: Me formei no ensino médio! É hora de decidir o futuro.`);
    }

    if (newState.university) {
      newState.university.yearsLeft -= 1;
      newState.bankBalance -= newState.university.costYear;
      if (newState.university.yearsLeft <= 0) {
        yearLogs.push(`Idade ${newState.age}: Me formei com sucesso na faculdade de ${newState.university.name}!`);
        newState.completedDegrees = [...(newState.completedDegrees || []), newState.university.name];
        newState.university = null;
      } else {
        yearLogs.push(`Idade ${newState.age}: Concluí mais um ano na faculdade de ${newState.university.name}.`);
      }
    }

    if (newState.job) {
      newState.bankBalance += newState.job.salary;
      yearLogs.push(`Idade ${newState.age}: Trabalhei como ${newState.job.title} e recebi $${newState.job.salary.toLocaleString()}.`);
    }

    let totalAssetExpenses = 0;
    newState.assets.forEach(asset => {
      totalAssetExpenses += asset.yearlyMaintenance || 0;
    });
    if (totalAssetExpenses > 0) {
      newState.bankBalance -= totalAssetExpenses;
      yearLogs.push(`Gastei $${totalAssetExpenses.toLocaleString()} com a manutenção do meu patrimônio.`);
    }
  }

  newState.relationships = newState.relationships.map(rel => {
    if (!rel.alive) return rel;
    const newAge = rel.age + 1;
    if (newAge > 75 && Math.random() < 0.15) {
      yearLogs.push(`Infelizmente, meu/minha ${rel.relation} (${rel.name}) falaleceu aos ${newAge} anos.`);
      return { ...rel, age: newAge, alive: false };
    }
    return { ...rel, age: newAge };
  });

  if (newState.age > 60) {
    const healthDecay = getRandomInt(1, 6);
    newState.health = clampStat(newState.health - healthDecay);
  }

  if (newState.health <= 0) {
    newState.isDead = true;
    newState.deathCause = "Problemas graves de saúde";
    yearLogs.push(`Idade ${newState.age}: Não resisti às complicações de saúde e faleci.`);
  } else if (newState.age >= 90 && Math.random() < 0.25) {
    newState.isDead = true;
    newState.deathCause = "Causas naturais (velhice)";
    yearLogs.push(`Idade ${newState.age}: Faleci pacificamente dormindo devido à velhice.`);
  }

  let selectedEvent = null;
  if (!newState.isDead && !newState.inPrison) {
    const validEvents = AGE_EVENTS.filter(
      ev => newState.age >= ev.minAge && newState.age <= ev.maxAge
    );
    if (validEvents.length > 0 && Math.random() < 0.8) {
      selectedEvent = getRandomChoice(validEvents);
    } else if (Math.random() < 0.5) {
      const randomMsg = getRandomChoice(RANDOM_EVENTS);
      yearLogs.push(`Idade ${newState.age}: ${randomMsg}`);
    }
  }

  const formattedLogs = yearLogs.map(text => ({
    age: newState.age,
    text
  }));

  newState.logs = [...newState.logs, ...formattedLogs];
  newState.activeEvent = selectedEvent;

  saveGame(newState);
  return newState;
}

export function handleEventChoice(state, eventOption) {
  let newState = { ...state, activeEvent: null };

  if (eventOption.effects) {
    const { happiness, health, intelligence, look, money } = eventOption.effects;
    if (happiness) newState.happiness = clampStat(newState.happiness + happiness);
    if (health) newState.health = clampStat(newState.health + health);
    if (intelligence) newState.intelligence = clampStat(newState.intelligence + intelligence);
    if (look) newState.look = clampStat(newState.look + look);
    if (money) newState.bankBalance += money;
  }

  if (eventOption.log) {
    newState.logs = [
      ...newState.logs,
      { age: newState.age, text: eventOption.log }
    ];
  }

  saveGame(newState);
  return newState;
}
