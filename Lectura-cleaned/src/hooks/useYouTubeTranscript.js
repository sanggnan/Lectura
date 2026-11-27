export async function fetchYouTubeTranscript() {
  return TRANSCRIPT
}

export function getTranscriptSlice(transcript, fromSec, toSec) {
  return transcript
    .filter(item => item.start >= fromSec && item.start < toSec)
    .map(item => item.text)
    .join(' ')
    .trim()
}

const TRANSCRIPT = [
  { start: 0, text: "Hi, I'm Rob. Welcome to Math Antics." },
  { start: 3, text: "In this video, we're going to learn how to solve basic algebra equations." },
  { start: 8, text: "But first, let's make sure we understand what an equation is." },
  { start: 12, text: "An equation is a mathematical statement that says two things are equal." },
  { start: 17, text: "It always has an equals sign in the middle." },
  { start: 20, text: "For example, 3 plus 4 equals 7 is an equation." },
  { start: 25, text: "In algebra, equations often contain a variable — usually the letter x." },
  { start: 31, text: "A variable is just a symbol that represents an unknown number." },
  { start: 36, text: "For example, x plus 3 equals 7 is an algebra equation." },
  { start: 41, text: "Our job is to find out what number x represents." },
  { start: 45, text: "This is called solving the equation." },
  { start: 48, text: "To solve an equation, we need to get the variable by itself on one side." },
  { start: 54, text: "We call this isolating the variable." },
  { start: 57, text: "To isolate x, we need to get rid of everything else on that side." },
  { start: 62, text: "In the equation x plus 3 equals 7, the 3 is being added to x." },
  { start: 68, text: "To get rid of it, we do the opposite operation — we subtract 3." },
  { start: 74, text: "But here's the key rule: whatever we do to one side, we must do to the other side." },
  { start: 80, text: "This keeps the equation balanced." },
  { start: 83, text: "Think of an equation like a balance scale." },
  { start: 87, text: "If you add or remove weight from one side, you must do the same to the other." },
  { start: 93, text: "So if we subtract 3 from the left side, we subtract 3 from the right side too." },
  { start: 100, text: "x plus 3 minus 3 equals 7 minus 3." },
  { start: 105, text: "The plus 3 and minus 3 cancel each other out." },
  { start: 109, text: "So we get x equals 4." },
  { start: 112, text: "That's our answer. x equals 4." },
  { start: 115, text: "We can check our work by substituting 4 back into the original equation." },
  { start: 121, text: "4 plus 3 equals 7. That's true, so our answer is correct." },
  { start: 127, text: "Now let's try one with subtraction." },
  { start: 130, text: "x minus 5 equals 3." },
  { start: 133, text: "To isolate x, we need to get rid of the minus 5." },
  { start: 137, text: "The opposite of subtraction is addition, so we add 5 to both sides." },
  { start: 143, text: "x minus 5 plus 5 equals 3 plus 5." },
  { start: 148, text: "The minus 5 and plus 5 cancel out." },
  { start: 151, text: "So x equals 8." },
  { start: 154, text: "Let's check: 8 minus 5 equals 3. Correct!" },
  { start: 159, text: "The key idea here is using inverse operations." },
  { start: 163, text: "Inverse operations are opposite operations that undo each other." },
  { start: 168, text: "Addition and subtraction are inverse operations." },
  { start: 172, text: "Multiplication and division are also inverse operations." },
  { start: 177, text: "When solving equations, we use inverse operations to cancel out numbers." },
  { start: 183, text: "Let's look at a few more examples to practice." },
  { start: 187, text: "Example: x plus 12 equals 20." },
  { start: 191, text: "Subtract 12 from both sides." },
  { start: 194, text: "x equals 20 minus 12, which is 8." },
  { start: 199, text: "Check: 8 plus 12 equals 20. Correct!" },
  { start: 204, text: "Example: x minus 9 equals 6." },
  { start: 208, text: "Add 9 to both sides." },
  { start: 211, text: "x equals 6 plus 9, which is 15." },
  { start: 216, text: "Check: 15 minus 9 equals 6. Correct!" },
  { start: 221, text: "Remember the two key rules for solving equations." },
  { start: 225, text: "Rule 1: Get the variable by itself using inverse operations." },
  { start: 230, text: "Rule 2: Whatever you do to one side, you must do to the other side." },
  { start: 237, text: "These rules apply to all equations, not just the simple ones we've seen today." },
  { start: 243, text: "As you learn more algebra, the equations get more complex." },
  { start: 248, text: "But these two rules will always be the foundation." },
  { start: 253, text: "Practice solving equations on your own to get comfortable with the process." },
  { start: 259, text: "The more you practice, the easier it becomes." },
  { start: 263, text: "Thanks for watching Math Antics. See you next time!" },
]
