// Synthetic student performance data
// Collected from 30 students solving algebra problems

export const STUDENT_DATA = [
  // What Is an Equation
  { topic: "What Is an Equation", question: "Is 5 + 3 = 8 an equation?", correct: true,  timeSeconds: 8,  errorType: null },
  { topic: "What Is an Equation", question: "Is 5 + 3 = 8 an equation?", correct: true,  timeSeconds: 6,  errorType: null },
  { topic: "What Is an Equation", question: "Is 5 + 3 = 8 an equation?", correct: false, timeSeconds: 14, errorType: "confused equation with expression" },
  { topic: "What Is an Equation", question: "Which of these is an equation: 2x+1, 2x+1=5, or 2x?", correct: true,  timeSeconds: 10, errorType: null },
  { topic: "What Is an Equation", question: "Which of these is an equation: 2x+1, 2x+1=5, or 2x?", correct: false, timeSeconds: 20, errorType: "selected expression instead of equation" },
  { topic: "What Is an Equation", question: "Which of these is an equation: 2x+1, 2x+1=5, or 2x?", correct: true,  timeSeconds: 9,  errorType: null },

  // Variables and Unknown Numbers
  { topic: "Variables and Unknown Numbers", question: "What does x represent in x + 4 = 9?", correct: true,  timeSeconds: 12, errorType: null },
  { topic: "Variables and Unknown Numbers", question: "What does x represent in x + 4 = 9?", correct: false, timeSeconds: 25, errorType: "thought x always equals 0" },
  { topic: "Variables and Unknown Numbers", question: "What does x represent in x + 4 = 9?", correct: false, timeSeconds: 30, errorType: "confused variable with coefficient" },
  { topic: "Variables and Unknown Numbers", question: "If y + 2 = 7, what is y?", correct: true,  timeSeconds: 15, errorType: null },
  { topic: "Variables and Unknown Numbers", question: "If y + 2 = 7, what is y?", correct: false, timeSeconds: 40, errorType: "added instead of subtracted" },
  { topic: "Variables and Unknown Numbers", question: "If y + 2 = 7, what is y?", correct: true,  timeSeconds: 18, errorType: null },

  // Isolating the Variable
  { topic: "Isolating the Variable", question: "Solve: x + 5 = 12", correct: true,  timeSeconds: 20, errorType: null },
  { topic: "Isolating the Variable", question: "Solve: x + 5 = 12", correct: false, timeSeconds: 45, errorType: "added 5 to right side instead of subtracting" },
  { topic: "Isolating the Variable", question: "Solve: x + 5 = 12", correct: false, timeSeconds: 38, errorType: "added 5 to right side instead of subtracting" },
  { topic: "Isolating the Variable", question: "Solve: x + 5 = 12", correct: false, timeSeconds: 50, errorType: "forgot to apply operation to both sides" },
  { topic: "Isolating the Variable", question: "Solve: x - 3 = 10", correct: true,  timeSeconds: 22, errorType: null },
  { topic: "Isolating the Variable", question: "Solve: x - 3 = 10", correct: false, timeSeconds: 35, errorType: "subtracted instead of adding" },
  { topic: "Isolating the Variable", question: "Solve: x - 3 = 10", correct: true,  timeSeconds: 19, errorType: null },
  { topic: "Isolating the Variable", question: "Solve: x - 3 = 10", correct: false, timeSeconds: 55, errorType: "forgot to apply operation to both sides" },

  // Keeping Equations Balanced
  { topic: "Keeping Equations Balanced", question: "If you subtract 4 from the left, what must you do to the right?", correct: true,  timeSeconds: 10, errorType: null },
  { topic: "Keeping Equations Balanced", question: "If you subtract 4 from the left, what must you do to the right?", correct: false, timeSeconds: 22, errorType: "said nothing needs to be done to right side" },
  { topic: "Keeping Equations Balanced", question: "If you subtract 4 from the left, what must you do to the right?", correct: false, timeSeconds: 28, errorType: "said add instead of subtract" },
  { topic: "Keeping Equations Balanced", question: "In x + 6 = 15, subtract 6 from left only — is it still balanced?", correct: false, timeSeconds: 35, errorType: "said yes — did not understand balance rule" },
  { topic: "Keeping Equations Balanced", question: "In x + 6 = 15, subtract 6 from left only — is it still balanced?", correct: true,  timeSeconds: 18, errorType: null },
  { topic: "Keeping Equations Balanced", question: "In x + 6 = 15, subtract 6 from left only — is it still balanced?", correct: false, timeSeconds: 40, errorType: "said yes — did not understand balance rule" },

  // Inverse Operations
  { topic: "Inverse Operations", question: "What is the inverse operation of addition?", correct: true,  timeSeconds: 8,  errorType: null },
  { topic: "Inverse Operations", question: "What is the inverse operation of addition?", correct: true,  timeSeconds: 7,  errorType: null },
  { topic: "Inverse Operations", question: "What is the inverse operation of addition?", correct: false, timeSeconds: 15, errorType: "said multiplication" },
  { topic: "Inverse Operations", question: "To solve x + 9 = 14, which operation do you apply?", correct: true,  timeSeconds: 14, errorType: null },
  { topic: "Inverse Operations", question: "To solve x + 9 = 14, which operation do you apply?", correct: false, timeSeconds: 30, errorType: "applied addition instead of subtraction" },
  { topic: "Inverse Operations", question: "To solve x + 9 = 14, which operation do you apply?", correct: false, timeSeconds: 28, errorType: "applied addition instead of subtraction" },
  { topic: "Inverse Operations", question: "To solve x - 7 = 3, which operation do you apply?", correct: true,  timeSeconds: 16, errorType: null },
  { topic: "Inverse Operations", question: "To solve x - 7 = 3, which operation do you apply?", correct: false, timeSeconds: 42, errorType: "applied subtraction instead of addition" },
  { topic: "Inverse Operations", question: "To solve x - 7 = 3, which operation do you apply?", correct: false, timeSeconds: 38, errorType: "confused which side to apply operation" },

  // Checking Your Answer
  { topic: "Checking Your Answer", question: "Solve x + 3 = 7 then verify your answer", correct: true,  timeSeconds: 25, errorType: null },
  { topic: "Checking Your Answer", question: "Solve x + 3 = 7 then verify your answer", correct: false, timeSeconds: 50, errorType: "solved correctly but substituted back incorrectly" },
  { topic: "Checking Your Answer", question: "Solve x + 3 = 7 then verify your answer", correct: true,  timeSeconds: 30, errorType: null },
  { topic: "Checking Your Answer", question: "If x=5 and equation is x - 2 = 3, does x=5 check out?", correct: true,  timeSeconds: 12, errorType: null },
  { topic: "Checking Your Answer", question: "If x=5 and equation is x - 2 = 3, does x=5 check out?", correct: false, timeSeconds: 20, errorType: "arithmetic error during substitution" },
  { topic: "Checking Your Answer", question: "If x=5 and equation is x - 2 = 3, does x=5 check out?", correct: true,  timeSeconds: 11, errorType: null },

  // Solving with Addition and Subtraction
  { topic: "Solving with Addition and Subtraction", question: "Solve: x + 12 = 20", correct: true,  timeSeconds: 18, errorType: null },
  { topic: "Solving with Addition and Subtraction", question: "Solve: x + 12 = 20", correct: false, timeSeconds: 45, errorType: "added 12 to both sides" },
  { topic: "Solving with Addition and Subtraction", question: "Solve: x + 12 = 20", correct: false, timeSeconds: 38, errorType: "forgot to apply to both sides" },
  { topic: "Solving with Addition and Subtraction", question: "Solve: x - 9 = 6", correct: true,  timeSeconds: 20, errorType: null },
  { topic: "Solving with Addition and Subtraction", question: "Solve: x - 9 = 6", correct: false, timeSeconds: 35, errorType: "subtracted 9 from both sides" },
  { topic: "Solving with Addition and Subtraction", question: "Solve: x - 9 = 6", correct: true,  timeSeconds: 22, errorType: null },
  { topic: "Solving with Addition and Subtraction", question: "Solve: x - 9 = 6", correct: false, timeSeconds: 52, errorType: "confused sign direction" },

  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 33, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 24, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 45, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 27, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 32, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 49, errorType: "Arithmetic Error" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 62, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 23, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 32, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 33, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 47, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 74, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 54, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 66, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 38, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 42, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 25, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 39, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 60, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 50, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 63, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 23, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 63, errorType: "Sign Flip" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 45, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 65, errorType: "Incomplete Inverse" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 26, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 45, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 30, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 35, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 22, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 51, errorType: "Arithmetic Error" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 31, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 28, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 24, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 36, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 51, errorType: "Arithmetic Error" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 34, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 22, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 25, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 32, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 58, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 73, errorType: "Sign Flip" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 39, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 34, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 69, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 44, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 73, errorType: "Incomplete Inverse" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 44, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 26, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 34, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 22, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 32, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 35, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 28, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 31, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 19, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 26, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 35, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 29, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 62, errorType: "Arithmetic Error" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 41, errorType: "Incomplete Inverse" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 68, errorType: "Arithmetic Error" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 63, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 25, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 66, errorType: "Sign Flip" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 30, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 32, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 53, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 23, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 25, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 38, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 39, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 63, errorType: "Arithmetic Error" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 44, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 35, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 25, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 59, errorType: "Sign Flip" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 40, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 16, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 26, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 73, errorType: "Sign Flip" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 18, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 41, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 47, errorType: "Sign Flip" },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: true, timeSeconds: 15, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 29, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 30, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 65, errorType: "Arithmetic Error" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: false, timeSeconds: 36, errorType: "Negative Distribution (Sign Error)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 40, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 26, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 15, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 74, errorType: "Incomplete Inverse" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 50, errorType: null },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 37, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 69, errorType: null },
  { topic: "Combining Terms", question: "3x + 2 = 11", correct: false, timeSeconds: 17, errorType: "Added Unlike Terms (3x+2=5x)" },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: true, timeSeconds: 55, errorType: null },
  { topic: "Multi-step", question: "4(x - 2) + 3 = 19", correct: false, timeSeconds: 56, errorType: "Sign Flip" },
  { topic: "Distribution", question: "-3(x - 4) = 12", correct: true, timeSeconds: 32, errorType: null },
]

export function getTopicStats() {
  const stats = {}
  for (const entry of STUDENT_DATA) {
    if (!stats[entry.topic]) {
      stats[entry.topic] = { total: 0, incorrect: 0, totalTime: 0, errors: [] }
    }
    stats[entry.topic].total++
    stats[entry.topic].totalTime += entry.timeSeconds
    if (!entry.correct) {
      stats[entry.topic].incorrect++
      if (entry.errorType) stats[entry.topic].errors.push(entry.errorType)
    }
  }
  for (const topic of Object.keys(stats)) {
    const s = stats[topic]
    s.errorRate = Math.round((s.incorrect / s.total) * 100)
    s.avgTime = Math.round(s.totalTime / s.total)
    const errorCounts = {}
    s.errors.forEach(e => errorCounts[e] = (errorCounts[e] || 0) + 1)
    s.topErrors = Object.entries(errorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([err]) => err)
  }
  return stats
}

// Match a Claude-generated topic name to the nearest topic in student data

// ── Topic Matching ────────────────────────────────────────────────────────────

function stem(word) {
  return word
    .replace(/ing$/, '').replace(/tion$/, '').replace(/tions$/, '')
    .replace(/ed$/, '').replace(/ies$/, 'y').replace(/s$/, '').replace(/es$/, '')
    .toLowerCase().trim()
}

const TOPIC_KEYWORDS = {
  'What Is an Equation': [
    'equat', 'equals sign', 'equal sign', 'statement', 'two sides',
    'expression vs equation', 'mathematical statement',
  ],
  'Variables and Unknown Numbers': [
    'variabl', 'unknown', 'letter', 'symbol', 'represent', 'find x',
    'find the value', 'placeholder', 'stand for',
  ],
  'Isolating the Variable': [
    'isolat', 'get x alone', 'variable alone', 'by itself', 'one side',
    'move term', 'rearrang', 'solve for',
  ],
  'Keeping Equations Balanced': [
    'balanc', 'both sides', 'same to both', 'scale', 'whatever you do',
    'maintain', 'preserve equality',
  ],
  'Inverse Operations': [
    'invers', 'opposite operation', 'undo', 'cancel out', 'reverse',
    'addition and subtraction', 'opposite', 'cancel',
  ],
  'Checking Your Answer': [
    'check', 'verif', 'substitut', 'plug in', 'plug back', 'confirm',
    'validate', 'test answer',
  ],
  'Solving with Addition and Subtraction': [
    'add to both', 'subtract from both', 'addition equation',
    'subtraction equation', 'solving by adding', 'solving by subtract',
    'x plus', 'x minus',
  ],
  'Combining Terms': [
    'combin', 'like term', 'simplif', 'collect term', 'unlike term',
    'coeffici', 'same variable', 'add like',
  ],
  'Distribution': [
    'distribut', 'expand', 'parenthes', 'bracket', 'multiply out',
    'negat', 'sign error', 'sign flip', 'factor outside',
  ],
  'Multi-step': [
    'multi', 'multiple step', 'two step', 'order of operation',
    'arithmetic', 'incomplete invers', 'complex equation',
  ],
}

export function findMatchingTopics(topicName, bullets, stats) {
  const allText = [topicName, ...(bullets || [])].join(' ').toLowerCase()
  const allStems = allText.split(/[\s,.()+\-=:;!?]+/).filter(w => w.length > 2).map(stem)

  const results = []

  for (const [key, s] of Object.entries(stats)) {
    let score = 0
    const reasons = []

    // 1. Stem-match topic key words (weighted 3x)
    const keyStems = key.toLowerCase().split(/\s+/).map(stem)
    for (const ks of keyStems) {
      if (ks.length < 3) continue
      const matches = allStems.filter(as => as.length > 2 && (as.includes(ks) || ks.includes(as)))
      if (matches.length > 0) {
        score += matches.length * 3
        reasons.push('topic word "' + ks + '"')
      }
    }

    // 2. Keyword alias matching
    const aliases = TOPIC_KEYWORDS[key] || []
    for (const alias of aliases) {
      const aliasStems = alias.split(/\s+/).map(stem)
      if (aliasStems.every(as => allStems.some(ts => ts.includes(as) || as.includes(ts)))) {
        score += 2
        reasons.push('keyword "' + alias + '"')
      }
    }

    // 3. Error type matching
    const errorTexts = STUDENT_DATA.filter(d => d.topic === key && d.errorType).map(d => d.errorType)
    for (const err of [...new Set(errorTexts)]) {
      const errStems = err.toLowerCase().split(/[\s()]+/).map(stem)
      const overlap = errStems.filter(es => es.length > 2 && allStems.some(ts => ts.includes(es) || es.includes(ts))).length
      if (overlap > 0) {
        score += overlap
        reasons.push('error type match')
      }
    }

    if (score > 0 && s.errorRate >= 40) {
      results.push({
        topic: key, score, reasons: [...new Set(reasons)].slice(0, 4),
        errorRate: s.errorRate, avgTime: s.avgTime, topErrors: s.topErrors,
        total: s.total, incorrect: s.incorrect,
      })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}
