//declare variables 
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

//function getUrban(input){}
//create a function that takes in searchInput and fetches urban dictionary search word
//this function will set the html card for urban dictionary to the return from fetch

//function getTraditional(input){}
//create a function that takes in searchInput and fetches traditional dictionary search word
//this function will set the html card for traditional dictionary to the return from fetch

//add event to search button
//set searchInput to user search input
//call getLocal storage function
//push searchInput to the end of the history array delcared above
//call set local storage function and pass history array to it
//call function that fetches traditional dictionary search word pass searchInput
//call function that fetches urban dictionary search word pass searchInput

//add event to view history button
//call getLocal storage function
//this event callback function will loop through history array and build out html for each word that has been searched in the past.

//Capture the boring 
var results = document.querySelector("#results");
var searchedWord = document.querySelector("#searchedWord");
var defined = document.querySelector("#defined");
var definitions = document.querySelector("#definitions");

var boringWord = function(word){
    word = "fetch"
    var captureBoringUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

    fetch(captureBoringUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayBoringWord(data);
            });
        }
        else {
            alert("That is not a word in our dictionary");
        }
    });

};

//Display boring word
var displayBoringWord = function(word){
    console.log(word);
    
    //Display word
    var wordWord = document.createElement("span");
    wordWord.textContent = word[0].word;
    searchedWord.appendChild(wordWord);

    //Display Definitions
    var wordDefinition = document.createElement("li");
    
    var meaningLength = word[0].meanings.length;
    for(var i = 0; i < meaningLength; i++){
        wordDefinition.textContent = word[0].meanings[i].definitions[0].definition;
        definitions.appendChild(wordDefinition);
    }


    //wordDefinition.textContent = word[0].meanings[0].definitions[0].definition;
    //defined.appendChild (wordDefinition);

}

boringWord();