const article = document.querySelector("article");

if (article) {
    console.log("!!!!!!!!! WelCome My Extensions !!!!!!!!! ");
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  const wordCount = [...words].length;
  console.log("wordCount : ", wordCount);

  const readingTime = Math.round(wordCount / 200);
  console.log("readingTime : ", readingTime);

  const badge = document.createElement("p");
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  const heading = article.querySelector("h1");
  heading.insertAdjacentElement("afterend", badge);

  // Create a button
  const button = document.createElement("button");
  button.textContent = "Change Article Color";
  button.style.padding = "10px";
  button.style.marginTop = "10px";

  // Append the button to the DOM
  article.insertAdjacentElement("beforebegin", button);

  // Add event listener to change the article's background color
  button.addEventListener("click", () => {
    // Toggle the background color of the article
    console.log(article.style.backgroundColor)
    if (article.style.backgroundColor === 'rgb(176, 219, 221)') {
      article.style.backgroundColor = ''; // Reset to default
    } else {
      article.style.backgroundColor = 'rgb(176, 219, 221)'; // Change to yellow
    }
  });

  console.log("badge : ", badge);
}else{

  console.log("Cannot USE My Extensions !!!!!!!!! ");
  
}






// Listen for messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'ADD_SPANS') {
        addSpansToArticle(request.count);
    }
});
function addSpansToArticle(count) {
    console.log("FN addSpansToArticle : ",count)
    const article = document.querySelector('article');
    if (!article) {
        console.log('Article element not found.');
        return;
    }

    for (let i = 1; i <= count; i++) {
        const newSpan = document.createElement('span');
        newSpan.textContent = `New ${i} this from chrome.tabs.sendMessage call scripts/content.js `;
       // article.appendChild(newSpan);
            newSpan.style.display = 'block'; // Ensuring each span is on a new line
            article.insertAdjacentElement("beforebegin", newSpan);
    }
}