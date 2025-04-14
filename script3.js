//ques3
function analyzeText() {
    const text = document.getElementById("inputText").value;
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const wordCount = (text.match(/\b\w+\b/g) || []).length;
    const spaceCount = (text.match(/ /g) || []).length;
    const newlineCount = (text.match(/\n/g) || []).length;
    const specialCharCount = (text.match(/[^\w\s]/g) || []).length;
  // Tokenize words (lowercased for matching)
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
   // Define groups
    const pronouns = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "its", "our", "their"];
    const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "off", "over", "under"];
    const articles = ["a", "an"];
    const countOccurrences = (groupList) => {
      const counts = {};
      for (const word of words) {
        if (groupList.includes(word)) {
          counts[word] = (counts[word] || 0) + 1;
        }
      }
      return counts;
    };
    const pronounCounts = countOccurrences(pronouns);
    const prepositionCounts = countOccurrences(prepositions);
    const articleCounts = countOccurrences(articles);
    // Display output
    const output = `
  Letters: ${letterCount}
  Words: ${wordCount}
  Spaces: ${spaceCount}
  Newlines: ${newlineCount}
  Special Characters: ${specialCharCount}
 --- Pronoun Counts ---
  ${JSON.stringify(pronounCounts, null, 2)}
--- Preposition Counts ---
  ${JSON.stringify(prepositionCounts, null, 2)}
 --- Indefinite Articles Counts ---
  ${JSON.stringify(articleCounts, null, 2)}
  `;
  document.getElementById("output").textContent = output;
  }
  