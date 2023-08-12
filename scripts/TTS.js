
window.addEventListener("load",()=>{
    const a = document.createElement("script")
    a.setAttribute("src","https://kit.fontawesome.com/719270a6fc.js")
    a.setAttribute("crossorigin","anonymous");
    const b = document.createElement("link")
    b.setAttribute("rel","stylesheet")
    b.setAttribute("href","./css/audioControls.css");
    document.head.appendChild(a)
    document.head.appendChild(b)
    speechSynthesis.cancel();
})


let msg;
let speech = window.speechSynthesis;
speech.playing = false;
speech.pausing = false;
let playingFor,parts;
$(".audioControl").click(function (a) {
    $(a.target).toggleClass("fa-pause"); //<i class="fa-solid fa-pause"></i>
    $(a.target).toggleClass("fa-play"); //<i class="fa-solid fa-pause"></i>

    let text = a.target.dataset.id;
    text = $("#" + text).text();
    console.log(text);
    const string = removePunctuation(text);
    console.log(string);


    msg = new SpeechSynthesisUtterance(string);
    msg.onend = ()=>{
        $(a.target).addClass("fa-play");
        $(a.target).removeClass("fa-pause");
        speech.playing = false;
        speech.pausing = false;
    }


    // Set the language code to Hindi
    msg.lang = "hi-IN";
    msg.rate = 0.9;

    if(playingFor != a.target)
        speech.cancel();

    playingFor = a.target;
    if(!(speech.playing)){
        console.log("start")
        speech.playing = true;
        speech.pausing = false;
        if(speech.speaking){
        speech.resume();
        return;
        }
        speech.speak(msg);
        return;
    }
    else if(speech.playing){
        speech.pause();
        speech.playing = false;
        speech.pausing = true;
        return;
    }
})

function removePunctuation(text) {
    // create a RegEx that matches any punctuation marks except . and ,
    // let re = /[2a-zA-Z0-9.,\s]/g; // str.replace(, "");
    let re = /[^ a-zA-Z0-9 _-]/g; // str.replace(, "");
    // use the replace method to remove the punctuation marks with an empty string

    // let newText = text.replace(/[^\( \)a-zA-Z \n,\u0900-\u097F]/g, "")
    let newText = text.replace(/[^a-zA-Z \n\u0900-\u097F()]/g, "")
    // return the new text

    // removing the words between the parenthesis
    newText = newText.replace(/\([^)]*\)/g, "");
    return newText;
  }