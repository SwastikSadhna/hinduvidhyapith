var a=gsap.timeline();


a.from(".navbar-brand",{
    y:-100,
    opacity:0,
    duration:0.8,
    delay:0.3
})
a.from("#items",{
    y:-120,
    opacity:0,
    duration:0.6,
    stagger:0.2
})
a.from(".both",{
    y:-110,
    opcaity:0,
    duration:0.3
})
a.from(".carousel-indicators,.carousel-inner,.carousel-item",{
    opacity:0,
    duration:0.5
})
a.to("h2",{
    opcaity:0,
    duration:0.5
})
// a.from("#cards",{
//     scale:0,
//     rotate:-360,
//     opacity:0,
//     duration:0.7,
//     stagger:0.4,
//     // scrollTrigger:{
//     //     trigger:".card",
//     //     scroller:
//     //     markers:true,
//     // }
// })

gsap.from("#custom-cards,#custom-card2,#custom-card3",{
    scale:0,
    opacity:0,
    duration:0.5,
    stagger:0.5,
    scrollTrigger:{
        trigger:"#custom-cards",
        scroller:"body",  
        // markers:true,
        // start:"top 100%",
        // end:"top 100%",
        // scrub:3
    }
})