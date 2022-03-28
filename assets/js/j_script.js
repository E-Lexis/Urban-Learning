//array named history - get local storage function will set this variable
//string named searchInput - for search input, set to empty string
//call get local storage function to set history array above

//function setLocal(arr){}
//create a function that takes in array that sets local storage
//JSON stringify array that is passed in
//set stringified array to local storage

//function getLocal(){}
//create a function that gets local storage array of search words
//get local storage item which will be an array of saved search words
//JSON parse the local storage item array
//set history array declared above to this parsed array from local storage


var searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];
document.querySelector("#search").addEventListener("click", () => {
    searchHistory.push(document.querySelector("#word-input").value);
    localStorage.searchHistory = JSON.stringify(searchHistory);
});

var data = document.querySelector("#search-data");
searchHistory.forEach((search) => {
    searchEl = document.createElement("option")
    searchEl.value = search;
    data.appendChild(searchEl);
});

document.querySelector("#word-input").addEventListener("focus", () => {
    appendChild(data);
});

//call getLocal storage function
//push searchInput to the end of the history array delcared above
//call set local storage function and pass history array to it
//add event to view history button
//call getLocal storage function
//this event callback function will loop through history array and build out html for each word that has been searched in the past.


//Function to capture search word
// jquery onclick event handler to capture input from user & calls two API functions 
$("#search").on("click", function () {
    event.preventDefault();
    var searchInput = document.querySelector("#word-input").value;
    getUrban(searchInput);
    boringWord(searchInput);
});

// function takes in search term from user
function getUrban(searchInput) {

    // concatonates end point for urban API w/user search term, stores it in variable testURL
    var testURl = "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + searchInput;

    // then formatted the object for ajax call by setting URL, method, and headers
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": testURl,
        "method": "GET",
        "headers": {
            "x-rapidapi-key":
                "b7288dc5b6mshce15b452215a7dap154bc7jsna49c7ed6d646",
            "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
        }
    };

    // used ajax to make a git request to urban api
    $.ajax(settings).done(function (response) {
        //if the response has a list of defs it writes it to the html
        if (response.list.length > 0) {
            document.getElementById("urban-word").innerText = "Word: " + response.list[0].word;
            document.getElementById("urban-def").innerText = "Top Definition: " + response.list[0].definition;
            document.getElementById("urban-def2").innerText = "Alternative Definitions: " + response.list[1].definition;
            document.getElementById("urban-def3").innerText = response.list[2].definition;
            return;
            // if it doesn't have defs, it clears the card & displays modal
        }else{
            $("#urban-word").empty();
            $("#urban-def").empty();
            $("#urban-def2").empty();
            $("#urban-def3").empty();
            $("#modal-warning-urban").modal();
        }
    })
};

//Boring dictionary variables
var standardWord = document.querySelector("#standard-word");
var definitions = document.querySelector("#standard-def");
var alternativeDefs = document.querySelector("#alternative-defs");

// Capture the boring word
var boringWord = function (word) {
    var captureBoringUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

    fetch(captureBoringUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayBoringWord(data, word);
            });
        }
        else {
            $("#standard-word").empty();
            $("#standard-def").empty();
            $("#alternative-defs").empty();
            $("#modal-warning-boring").modal();
        }
    });
};

//Display boring word
var displayBoringWord = function (word, searchedWord) {
    //Clear previously searched words
    standardWord.textContent = "";
    
    //Display searched word
    standardWord.textContent = "Word: " + searchedWord;
    
    //Display Top Definition
    var topDefinition = word[0].meanings[0].definitions[0].definition;
    definitions.textContent = "Top Definition: " + topDefinition;

    //Identify how many word meanings are in the array and display the alternatives
    alternativeDefs.textContent = "";

    var meaningLength = word[0].meanings.length;
    for(var i = 0; i < meaningLength; i++){             
        var definitionLength = word[0].meanings[i].definitions.length;
        $("#alternative-defs").empty();
        for(var j = 1; j < definitionLength; j++){
            var wordDefinition = document.createElement("li");
            wordDefinition.textContent = word[0].meanings[i].definitions[j].definition;
            alternativeDefs.appendChild(wordDefinition);
        }
    }
};

