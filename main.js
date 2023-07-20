console.log("Connected !!!")

// DECLARATIONS
const TopMoveDiv = document.querySelector("#moveToTop");

// FUNCTIONS 

const showTop = ()=>{
    console.log("clicked")
    window.scrollTo({top:0,left:0,behavior:"smooth"})
}

// LISTENER ASSIGNMENTS
TopMoveDiv.addEventListener("click",showTop);



// EXTRA THINGS