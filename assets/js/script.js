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
