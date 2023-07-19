var a=gsap.timeline();

a.from(".navbar",{
    y:-100,
    opacity:0,
    duration:0.7,
    delay:0.5
})

a.from(".carousel-indicators,.carousel-inner,.carousel-item",{
    opacity:0,
    duration:1,
})
a.to("h2",{
    opcaity:0,
    duration:1,
    
})
a.from("#card-body",{
    opacity:0,
    duration:1
})
a.from("#custom-cards",{
    opacity:0,
    duration:1,
    scale:0,
    scrollTrigger:{
        trigger:"#custom-cards",
        scroller:"body",
        markers:true,
        start:"top 100%",
        end:"top 100%",
        scrub:3
    }
})