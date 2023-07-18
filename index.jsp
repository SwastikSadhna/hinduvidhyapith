var a = gsap.timeline();


a.from("nav",{
    y:-200,
    duration:1,
    delay:0.5,
    opacity:0,
    stagger:1
})

a.from("h2",{
    opacity:0,
    stagger:1,
    delay:0.5
})
a.from(".card",{
    x:-500,
    duration:1,
    delay:0.5,
    opacity:0,
    stagger:0.6
})