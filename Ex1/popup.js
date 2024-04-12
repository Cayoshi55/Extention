document.getElementById('addSpanButton').addEventListener('click', function() {
    console.log("onclick")
    const inputValue = parseInt(document.getElementById('inputField').value);
    console.log("inputValue : ",inputValue)

    if (isNaN(inputValue)) {
        alert('Please enter a valid number');
        return;
    }
    

    // Call Function in  this current file
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("chrome.tabs.query",tabs)
        console.log("tabs[0].id",tabs[0].id)
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            args: [inputValue],
            function: addSpansToArticle_1k
        });
    });


    // Call Function in scripts/content.js 
    // Send message to content script 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'ADD_SPANS', count: inputValue});
    });

});


function addSpansToArticle_1k(count) {
    console.log("FN addSpansToArticle_1k : ",count)
    const article = document.querySelector('article');
    if (article) {
        for (let i = 1; i <= count; i++) {
            const newSpan = document.createElement('span');
            newSpan.textContent = `New ${i} this from addSpansToArticle_1k`;
            newSpan.style.display = 'block'; // Ensuring each span is on a new line
            //article.appendChild(newSpan);
            article.insertAdjacentElement("beforebegin", newSpan);

        }
    } else {
        console.log('No article element found!');
    }
}

