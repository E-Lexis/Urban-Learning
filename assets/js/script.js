
//Capture the boring 
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

var displayBoringWord = function(word){
    console.log(word);
}

boringWord();