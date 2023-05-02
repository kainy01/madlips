function parseStory(story) {
  const words = story.split(/\s+/); // split by spaces
  const posRegex = /\[(\w+)\]/; // regular expression to match the POS tag
  const result = [];
  for (let word of words) {
    //(let i=0;i<story.length;i++)
    let posMatch = posRegex.exec(word);
    let pos = null;
    // console.log(posMatch)
    if (posMatch) {
      pos = posMatch[1]; // extract [n] [v] the POS tag
      word = word.replace(posRegex, ""); // remove the POS tag from the word
    }
    result.push({ word, pos });
  }
  console.log(result);
  checkInput(result);
}
function checkInput(words) {
  const resultTwo = [];
  const madLibsEdit = document.getElementById("madLibsEdit");
  const madLibsPreview = document.getElementById("madLibsPreview");

  function generateText(words) {
    let text = "";
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
  
      text += word.word;
      text += " ";
    }
    return text;
  }
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.pos === "n" || word.pos === "v" || word.pos === "a") {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength='20';
      if (word.pos === "n") {
        input.placeholder = "noun";
      } else if (word.pos === "v") {
        input.placeholder = "verb";
      } else if (word.pos === "a") {
        input.placeholder = "adj";
      }
      input.className = "word-input";
      input.dataset.index = i;
      input.dataset.pos = word.pos;
      resultTwo.push(input);

      input.addEventListener("input", () => {
        const value = input.value;
        const index = input.dataset.index;
        const pos = input.dataset.pos;
        words[index].word = value;
        const updatedText = generateText(words);
        madLibsPreview.innerHTML = updatedText;
      });
    } else {
      resultTwo.push(word.word);
    }
  }

  madLibsEdit.innerHTML = "";
  resultTwo.forEach((item) => {
    if (typeof item === "string") {
      madLibsEdit.appendChild(document.createTextNode(item + " "));
    } else {
      madLibsEdit.appendChild(item);
    }
  });

  const updatedText = generateText(words);
  madLibsPreview.innerHTML = updatedText;
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
