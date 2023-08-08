import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// RESIZE

window.addEventListener("resize",function(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})

class AvatarCard{
    static height=35;
    static width=26;
    texture;
    x;
    y;
    z;
    geometry;
    img;
    material;
    obj;

    constructor(img,x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        
        this.geometry = new THREE.BoxGeometry(AvatarCard.width,AvatarCard.height);
        this.texture = new THREE.TextureLoader().load(img);
        this.material = new THREE.MeshStandardMaterial({map:this.texture,transparent:true});
        this.obj = new THREE.Mesh(this.geometry,this.material)
        this.obj.position.set(this.x,this.y,this.z);
    }

     add(){
        earth.add(this.obj);
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
const orbit = new OrbitControls(camera, renderer.domElement);

// camera.position.set(-90,140,140);
// camera.position.set(0,120,180);
camera.position.set(0,0,200);
camera.updateProjectionMatrix();

orbit.maxDistance = 200;
orbit.minDistance = 150;


renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.add(orbit);

// Axes Helper
const axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

// Setting up background
const background = new THREE.TextureLoader().load('./IMG/Vishnu-avatar/background.webp');
scene.background = background;

// Light 
const light = new THREE.AmbientLight(0xffffff,2);
light.position.set(0,0,0)
scene.add(light)

// Sphere Geometry

const earthGeometry = new THREE.SphereGeometry(24);
const earthTexture = new THREE.TextureLoader().load('./earth.jpg');
const earthMaterial = new THREE.MeshStandardMaterial( {map:earthTexture,transparent:true});
const earth = new THREE.Mesh(earthGeometry,earthMaterial);
earth.position.set(0,0,0)
scene.add(earth);


const avatar1 = new AvatarCard('./IMG/Vishnu-avatar/Matsya-avatar.png',70,0,0);
avatar1.add();


const avatar2 = new AvatarCard('./IMG/Vishnu-avatar/Kurma-avatar.png',45,0,-45);
avatar2.add();


const avatar3 = new AvatarCard('./IMG/Vishnu-avatar/Varaha-avatar.png',-45,0,45);
avatar3.add();


const avatar4 = new AvatarCard('./IMG/Vishnu-avatar/Narasimha-avatar.png',45,0,45);
avatar4.add();


const avatar5 = new AvatarCard('./IMG/Vishnu-avatar/Vamana-avatar.png',-70,0,0);
avatar5.add();


const avatar6 = new AvatarCard('./IMG/Vishnu-avatar/Parsuram-avatar.png',-45,0,-45);
avatar6.add();


const avatar7 = new AvatarCard('./IMG/Vishnu-avatar/Ram-avatar.png',0,0,-70);
avatar7.add();


renderer.render(scene, camera);

function animation(time){
    earth.rotation.y = time/3000;
    avatar1.obj.rotation.y = time/3000;
    avatar2.obj.rotation.y = time/3000;
    avatar3.obj.rotation.y = time/3000;
    avatar4.obj.rotation.y = time/3000;
    avatar5.obj.rotation.y = time/3000;
    avatar6.obj.rotation.y = time/3000;
    avatar7.obj.rotation.y = time/3000;

    renderer.render(scene, camera);
    orbit.update();
    renderer.setAnimationLoop(animation);
}

animation();