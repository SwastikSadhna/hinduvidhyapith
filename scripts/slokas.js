console.log("Jay Hanuman")

$(document).ready(function(){
    $(".nav-link").click(function(e){
        $(".nav-link").removeClass("active");
        $(e.target).addClass("active");
        $(".btn-close").click();
    })
    
})