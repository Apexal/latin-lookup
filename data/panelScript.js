var panel = document.getElementById("latin-lookup");
var loadingSpan = document.getElementById("loading");
var definitionDiv = document.getElementById("definition");

var latinWord = document.getElementById("latin");
var english = document.getElementById("english");
var link = document.getElementById("link");

self.port.on("translation", function(data) {
    var phrase = data.phrase;

    if(data.result == "ok") {
        latinWord.innerText = phrase;
        var definitions = data.tuc;
        console.log("Found "+definitions.length+" definitions for "+phrase)
        if(definitions.length > 0) {
            english.innerHTML = definitions.map(function(d) {
                if(d.hasOwnProperty('phrase'))
                    return "<span>- "+d.phrase.text+"</span><br>";
            }).join("");
        } else {
            english.innerHTML = "No definition found.";
        }

        link.href = "https://en.wiktionary.org/wiki/"+phrase+"#Latin";
        loadingSpan.style.display = "none";
        definitionDiv.style.display = "initial";
    } else {
        
    }
});

self.port.on("hide", function() {
    loadingSpan.style.display = "initial";
    definitionDiv.style.display = "none";
});