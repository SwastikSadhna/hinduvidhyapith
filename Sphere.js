import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// RESIZE DETECTOR
window.addEventListener("resize",function(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})

// Loading API
window.addEventListener( "load" ,async ()=>{
    
    const data = await API.getData();
    
    init();
    generateAvatarCards(data);
    // console.log(data)
})

class API{
    static data;
    static query;
    static {
        const q = new URLSearchParams(window.location.search);
        API.query = q.get("god").toLowerCase();
    }
    static async getData(){
        const response = await fetch("./scripts/APIs/Avatar.json");
         API.data = await response.json();
         AvatarCard.folder = API.data.folder;
         API.data = API.data[API.query];
         avatars = API.data.length;
         return API.data;
    };

    static loadCardData(id){
        const currentData = API.data.filter((value)=> value.id == id)
        // console.log(currentData);
        $("#cardImage").attr("src", AvatarCard.folder + currentData[0].image)
        $("#cardName").text( currentData[0].name)
        $("#cardBook").text( currentData[0].books ? currentData[0].books : " - ")
        $("#cardFestival").text( currentData[0].festival ? currentData[0].festival : " - ")
        $("#cardTemple").text( currentData[0].temples ? currentData[0].temples : " - ")
        $("#cardSloka").text( currentData[0].sloka ? currentData[0].sloka : " - ")
        $("#cardAbout").text( currentData[0].about ? currentData[0].about : " - ")
        $("#cardYug").text( currentData[0].yug ? currentData[0].yug : " - ")
    }   

}

// IMP PARAMETERS
let avatars,radius;
// AVATAR CARD CLASSS
class AvatarCard{
    static height= avatars > 15 ? 35 : 50; // 35, 26 , earth : 24
    static width=avatars > 15 ? 26 : 43;
    static folder;
    texture;
    x;
    y;
    z;
    geometry;
    img;
    material;
    obj;
    id;

    constructor(id,img,x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        
        this.geometry = new THREE.BoxGeometry(AvatarCard.width,AvatarCard.height);
        this.texture = new THREE.TextureLoader(loader).setPath("./IMG/Avatars/").load(img);
        this.material = new THREE.MeshStandardMaterial({map:this.texture,transparent:true});
        this.obj = new THREE.Mesh(this.geometry,this.material)
        this.obj.position.set(this.x,this.y,this.z);
        this.obj.type = "avatar";
        this.obj.cardId = id;
    }

     add(){
        earth.add(this.obj);
    }
}



// ALL VARIABLES
let stopAnimation = false; // Variable that is flag for animation
let cardOpened = false;    // Variable specifies whether the card is opened or what

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
const orbit = new OrbitControls(camera, renderer.domElement);
const progress = document.querySelector("#progress");
// AxesHelper
// const ah = new THREE.AxesHelper(200);
// scene.add(ah)
const loader = new THREE.LoadingManager(
    ()=>{
        console.log("Jay Shree Ram")
        document.querySelector("#loading1>center").innerText = "Loading Completed";
        gsap.to(".loading",{
            display:"none",
            duration:1,
            delay:0.5
        })
    },
    (url,loaded,total)=>{
        gsap.to(progress,{
            value:(loaded * 100/total),
            duration:0.2,
            ease:"power2.out"
        })
    }
);

function init(){
// camera.position.set(-90,140,140);
// camera.position.set(0,120,180);
if(avatars >= 15){
    camera.position.z = 280;
    radius = avatars*10;
}
else{
camera.position.z = 200;
radius = avatars*12;
}
camera.updateProjectionMatrix();

orbit.maxDistance = camera.position.z + 20;
orbit.minDistance = camera.position.z - 30;
// orbit.rotationSpeed = 0.4
}

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.add(orbit);

// Setting up background

const background = new THREE.TextureLoader(loader).load('background.jpg');
scene.background = background;

// Light 
const light = new THREE.AmbientLight(0xffffff,2);
light.position.set(0,0,0)
scene.add(light)

// Sphere Geometry - EARTH
const earthGeometry = new THREE.SphereGeometry(40);
const earthTexture = new THREE.TextureLoader(loader).load('./earth.jpg');
const earthMaterial = new THREE.MeshStandardMaterial( {map:earthTexture,transparent:true});
const earth = new THREE.Mesh(earthGeometry,earthMaterial);
earth.position.set(0,0,0)
scene.add(earth);

// AVATAR GENERATOR
function generateAvatarCards(data){
for(let i=0; i< data.length; i++){
    const avatar = new AvatarCard(data[i].id,data[i].image,70,0,0);

    const spherical = new THREE.Spherical();
    spherical.radius = radius;
    spherical.phi = Math.PI/2;
    spherical.theta = 2 * Math.PI * i/avatars;
    const cartesian = new THREE.Vector3();
    cartesian.setFromSpherical(spherical);
    avatar.obj.position.copy(cartesian);
    avatar.obj.rotation.y = spherical.theta;

    earth.add(avatar.obj);
}
renderer.render(scene, camera);
animation();
}


// ANIMATOR FUNCTION

function animation(time){
    earth.rotation.y = time/4000;

    renderer.render(scene, camera);
    orbit.update();
    if(!stopAnimation)
    renderer.setAnimationLoop(animation);
    else
    renderer.setAnimationLoop(null);


}



// display avatar
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener("click",AvatarSelected)

function AvatarSelected(event){
    if(cardOpened) return;
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    clickRender();
}

function clickRender() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

    // console.log(intersects[0])

    if(intersects && intersects.length > 0 && intersects[0].object.type == "avatar")
    {
        stopAnimation = true;
        const card = intersects[0].object;
        // console.log(card);
        // document.querySelector("#wholeCard").style.display = "initial";
        API.loadCardData(card.cardId);
        gsap.to("#wholeCard",{
            display:"initial",
            opacity:1,
            delay:0.2,
            ease: Power0.easeOut
        })
        renderer.render( scene, camera );
        cardOpened = true;
    }

}

document.querySelector(".btn-close").addEventListener("click",()=>{
    gsap.to("#wholeCard",{
        display:"none",
        opacity:0,
        delay:0.2,
        ease: Power0.easeOut
    })
    cardOpened = false;
    stopAnimation = false;
    speechSynthesis.cancel();
    speech.playing = false;
    $(".audioControl").removeClass("fa-pause"); //<i class="fa-solid fa-pause"></i>
    $(".audioControl").addClass("fa-play"); //<i class="fa-solid fa-pause"></i>
    renderer.setAnimationLoop(animation);
})


// const bg = [
    // './nirmal/left.jpg',    // left
    // './nirmal/right.jpg',    // left
    // './nirmal/up.jpg',    // left
    // './nirmal/floor.png',    // left
    // './nirmal/back.jpg',    // left
    // './nirmal/front.jpg'  // left
//  //   './rightside temple (1).jpg', // right
//    // './upside temple.jpg', // top
//     //'./floorside temple.png', //bottom
//     //'./backside temple.jpg',    // back
//     //'./frontside temple.jpg'    // front
// ];