console.log("Jay Shree Ram");



// CONSTANTS
const optionClass = "link-body-emphasis d-inline-flex text-decoration-none rounded";
const urlChapter = 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6e609ef5d2msh5bb3d2d9ef07dd2p1e4961jsne4d5757adcc7',
        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
    }
};
const posters = [
    "https://static.punjabkesari.in/multimedia/17_54_012157444geeta-1.jpg",
    "https://i.pinimg.com/736x/92/2f/45/922f451b9d6bf1b8a4513459ba0b5cf0.jpg",
    "https://n2.sdlcdn.com/imgs/b/e/7/Srimad-Bhagavad-Gita-as-it-SDL124307274-1-9e896.jpg",
    "https://assets.app.gurumaa.com/images/store/bhagwad-gita-cover-Eng-2x.jpg",
    "https://s3-us-west-2.amazonaws.com/issuewireassets/primg/76141/the-world-largest-and-longest-livestream-of-shrimad-bhagavad-geeta1080651654.png"
]

const pageData = {
    chapterName: "",
    totalChapter: 0,
    chapterNumber: 0,
    description: "",
    start: 1,
    end: 10,
    image: "",
    verseCount: 0,
    currentVerse: 1
}

// GET ALL REQUIRED TAGS 
const menuContainer = document.querySelectorAll(".chapters");
const chapterName = document.querySelector("#chapterName");
const chapterNumber = document.querySelector("#chapterNumber");
const tippni = document.querySelector("#tippni");
const description = document.querySelector("#description");
const lastPage = document.querySelector("#lastPage");
const firstPage = document.querySelector("#firstPage");
const slok = document.querySelector("#slok");
const slokNumber = document.querySelector("#slokNo");

// Some Required variables
let TotalChapter = 0;


// Getter Function

window.addEventListener("load", async () => {
    
    speechSynthesis.cancel();
    /* LOADING EFFECT CODE */
    try {
        let req = await fetch(urlChapter, options);
        let data = await req.json();

        // console.table(data)
        setInitData(data);

    }
    catch (error) {
        console.log(error)
    }
})



// Setter Functions 

async function setInitData(data) {
    pageData.total = data.length;
    console.log(data)
    createChapters(0, pageData.total, data);
    createChapters(1, pageData.total, data);
    await callApiChapter(1);
    await callApiSlok(1);
    generateNumbers(pageData.start, pageData.end);
}

function createChapters(index, total, data) {
    for (let i = 1; i <= total; i++) {
        let chapter = "Chapter - " + i + ` (${data[i - 1].verses_count})`;

        //`<li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">अध्याय
        //  1</a></li>`;

        let option = document.createElement("li");
        option.addEventListener("click", async () => {
            $(".loading").show("slow");
            await callApiChapter(i);
            document.querySelector("#closeBtn").click();
            pageData.currentVerse = 1;
            await callApiSlok(1);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            generateNumbers(pageData.start = 1, pageData.end = 10);
        });

        let anchor = document.createElement("a");
        anchor.innerText = chapter;
        anchor.setAttribute("class", optionClass)
        option.appendChild(anchor);

        setOptions(index, option);
    }
    // console.log(menuContainer[0])
}

function setContent(contentObj) {
    chapterName.innerText = contentObj.name;
    chapterNumber.innerText = contentObj.chapter_number;
    description.innerHTML = contentObj.chapter_summary_hindi;
    pageData.chapterNumber = contentObj.chapter_number;
    // lastPage.innerText = contentObj.verses_count;z
    pageData.verseCount = contentObj.verses_count;
    document.getElementById("content_img").setAttribute("src", posters[(parseInt(Math.random() * 10) % 5)]);
    /* LOADING EFFECT CODE */
    $(".loading").hide();
    // console.log(contentObj);
}


// Recall Api 

const callApiChapter =
    async (chapter) => {
        let req = await fetch(urlChapter + chapter + "/", options);
        let data = await req.json();

        setContent(data);
    };

const callApiSlok =
    async (verse) => {
        try {
            let req = await fetch(urlChapter + pageData.chapterNumber + "/verses/" + verse + "/", options);
            let data = await req.json();

            // console.log(data)
            switchSloka(data);
            slokNumber.innerText = pageData.currentVerse;
        } catch (error) {
            console.log(error);
        }
    };

// Extra Functions 

function setOptions(index, option) {
    menuContainer[index].appendChild(option);
}

function pagination(pageNum) {
    $(".loading").show();
    pageData.currentVerse = pageNum;
    callApiSlok(pageData.currentVerse);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
}

function genPageNum(decider) {
    if (decider == -1) {
        pageData.start > 1 ? generatePages("previous") : 0;

    }
    else if (decider == 1) {
        pageData.end < pageData.verseCount ? generatePages("next") : 0;
    }
}

function generatePages(param) {
    console.log("generating nums")
    switch (param) {
        case "previous":
            pageData.end = pageData.start - 1;
            pageData.start -= 10;

            generateNumbers(pageData.start, pageData.end);
            break;

        case "next":
            pageData.start += 10;
            pageData.end += 10;
            generateNumbers(pageData.start, pageData.end);
            break;
    }
}


function generateNumbers(start, end) {
    document.querySelector("#dynamicNums").innerHTML = "";
    for (var i = start; i <= end && i <= pageData.verseCount; i++) {

        let pageNum = document.createElement("li");
        pageNum.setAttribute("class", "page-item");

        let anchor = document.createElement("a");
        anchor.setAttribute("class", "page-link");
        anchor.setAttribute("onclick", `pagination(${i})`);
        anchor.innerText = i;

        pageNum.appendChild(anchor);
        document.querySelector("#dynamicNums").appendChild(pageNum);
    }
}

function switchSloka(contentObj) {
    tippni.innerText = contentObj.translations[contentObj.translations.length - 1].description;
    slok.innerText = contentObj.text;
    description.innerText = contentObj.commentaries[contentObj.commentaries.length - 2].description;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    /* LOADING EFFECT CODE */
    $(".loading").hide();
}

// let msg;
// let speech = window.speechSynthesis;
// speech.playing = false;
// speech.pausing = false;

// $(".audioControl").click(function (a) {
//     $(a.target).toggleClass("fa-pause"); //<i class="fa-solid fa-pause"></i>
//     $(a.target).toggleClass("fa-play"); //<i class="fa-solid fa-pause"></i>

//     let text = a.target.dataset.id;
//     text = $("#" + text).text();
//     const string = removePunctuation(text);
//     console.log(string);
//     msg = new SpeechSynthesisUtterance(string);

//     msg.onend = ()=>{
//         $(a.target).addClass("fa-play");
//         $(a.target).removeClass("fa-pause");
//         speech.playing = false;
//         speech.pausing = false;
//     }

//     // Set the language code to Hindi
//     msg.lang = "hi-IN";
//     msg.rate = 0.9;

//     if(!(speech.playing)){
//         console.log("start")
//         speech.playing = true;
//         speech.pausing = false;
//         if(speech.speaking){
//         speech.resume();
//         return;
//         }
//         speech.speak(msg);
//         return;
//     }
//     else if(speech.playing){
//         speech.pause();
//         speech.playing = false;
//         speech.pausing = true;
//         return;
//     }
// })

// function removePunctuation(text) {
//     // create a RegEx that matches any punctuation marks except . and ,
//     // let re = /[2a-zA-Z0-9.,\s]/g; // str.replace(, "");
//     let re = /[^a-zA-Z0-9 _-]/g; // str.replace(, "");
//     // use the replace method to remove the punctuation marks with an empty string
//     let newText = text.replace(/[^a-zA-Z ,\u0900-\u097F]/g, "")
//     // return the new text
//     return newText;
//   }