const affirmations = [
  "You are stronger than you know.",
  "You matter and your life has value.",
  "This feeling will pass.",
  "You are not alone in this.",
  "You have survived difficult times before.",
  "You are worthy of love and support.",
  "It's okay to not be okay right now.",
  "You are brave for reaching out.",
  "One moment at a time is enough.",
  "You are enough, just as you are.",
  "Your feelings are valid.",
  "You have people who care about you.",
  "Tomorrow is a new day.",
  "You are doing the best you can.",
  "You deserve peace and happiness.",
  "Your story isn't over yet.",
  "You have the strength to get through this.",
  "It's okay to ask for help.",
  "You are loved more than you know.",
  "This too shall pass."
];

export function getRandomAffirmation(): string {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  return affirmations[randomIndex];
}

export function getAllAffirmations(): string[] {
  return [...affirmations];
}
