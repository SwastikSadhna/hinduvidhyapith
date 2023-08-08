import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// RESIZE

window.addEventListener("resize",function(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})

const avatarImgs = [
    './Matsya-avatar.png',
    './Kurma-avatar.png',
    './Vamana-avatar.png',
    './Varaha-avatar.png',
    './Parsuram-avatar.png',
    './Balaram-avatar.png',
    './Ram-avatar.png',
    './Krishna-avatar.png',
    './Narasimha-avatar.png',
    './Kalki-avatar.png'
]

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
        this.texture = new THREE.TextureLoader().setPath('./IMG/Vishnu-avatar/').load(img);
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

for(let i=0; i<10; i++){
    const avatar = new AvatarCard(avatarImgs[i],70,0,0);

    const spherical = new THREE.Spherical();
    spherical.radius = 90;
    spherical.phi = Math.PI/2;
    spherical.theta = 2 * Math.PI * i/10;
    const cartesian = new THREE.Vector3();
    cartesian.setFromSpherical(spherical);
    avatar.obj.position.copy(cartesian);
    avatar.obj.rotation.y += (i)*10;

    earth.add(avatar.obj);
}


renderer.render(scene, camera);

function animation(time){
    earth.rotation.y = time/3000;

    renderer.render(scene, camera);
    orbit.update();
    renderer.setAnimationLoop(animation);
}

animation();