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

//call getLocal storage function
//push searchInput to the end of the history array delcared above
//call set local storage function and pass history array to it
//add event to view history button
//call getLocal storage function
//this event callback function will loop through history array and build out html for each word that has been searched in the past.


//Function to capture search word
$("#search").on("click", function () {
    var searchInput = document.querySelector("#word-input").value;
    console.log(searchInput);
    getUrban(searchInput);
    boringWord(searchInput);
});

function getUrban(searchInput) {

    var testURl = "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + searchInput;

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

    $.ajax(settings).done(function (response) {
        console.log(response);
        //this function will set the html card for urban dictionary 
        if (response) {
            console.log("apiUrban", response.list);
            document.getElementById("urban-word").innerText = "Word: " + response.list[0].word;
            document.getElementById("urban-def").innerText = "Top Definition: " + response.list[0].definition;
            document.getElementById("urban-def2").innerText = "Alternative Definition: " + response.list[1].definition;

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
            $("#modal-warning-boring").modal();
        }
    });
};

//Display boring word
var displayBoringWord = function (word, searchedWord) {
    console.log(word);
    
    //Clear previously searched words
    standardWord.textContent = "";
    
    //Display searched word
    standardWord.textContent = "Word: " + searchedWord;
    
    //Display Top Definition
    var topDefinition = word[0].meanings[0].definitions[0].definition;
    definitions.textContent = "Top Definition: " + topDefinition;

    //Identify how many word meanings are in the array and display the alternatives
    var meaningLength = word[0].meanings.length;
    for(var i = 0; i < meaningLength; i++){             
        var definitionLength = word[0].meanings[i].definitions.length;
        for(var j = 1; j < definitionLength; j++){
            var wordDefinition = document.createElement("li");
            wordDefinition.textContent = word[0].meanings[i].definitions[j].definition;
            alternativeDefs.appendChild(wordDefinition);
        }
    }
}

