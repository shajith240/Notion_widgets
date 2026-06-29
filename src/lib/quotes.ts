export interface Quote {
  text: string;
  author: string;
}

export const QUOTES: Quote[] = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Your only competition is who you were yesterday.", author: "" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Do something today that your future self will thank you for.", author: "" },
  { text: "One day or day one. You decide.", author: "" },
  { text: "Be so good they can't ignore you.", author: "Steve Martin" },
  { text: "The pain of discipline is less than the pain of regret.", author: "Jim Rohn" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "A year from now you'll wish you had started today.", author: "Karen Lamb" },
  { text: "You will never always be motivated. You must learn to be disciplined.", author: "" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Consistency is what transforms average into excellence.", author: "" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Never stop learning because life never stops teaching.", author: "" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "" },
  { text: "Focus on the process, not the outcome.", author: "" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
  { text: "Every expert was once a beginner.", author: "" },
  { text: "What you do today is what matters most.", author: "" },
  { text: "Pressure is a privilege.", author: "Billie Jean King" },
  { text: "Make it happen. Shock everyone.", author: "" },
  { text: "The harder you work, the luckier you get.", author: "Gary Player" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "" },
  { text: "Progress, not perfection.", author: "" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Don't watch the clock. Do what it does. Keep going.", author: "Sam Levenson" },
  { text: "I never dreamed about success. I worked for it.", author: "Estée Lauder" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "You are one decision away from a completely different life.", author: "" },
  { text: "Stop thinking. Start doing.", author: "" },
  { text: "Talent is overrated. Consistency wins.", author: "" },
  { text: "The only way out is through.", author: "Robert Frost" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Don't limit your challenges. Challenge your limits.", author: "" },
  { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
  { text: "Great things never come from comfort zones.", author: "" },
  { text: "First, solve the problem. Then, write the code.", author: "" },
  { text: "Small steps every day lead to big results.", author: "" },
  { text: "The grind never stops. Embrace it.", author: "" },
  { text: "Showing up is half the battle. Staying is the other half.", author: "" },
];

export function getTodaysQuote(): Quote {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return QUOTES[dayIndex % QUOTES.length];
}
