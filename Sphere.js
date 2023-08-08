import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// RESIZE

window.addEventListener("resize",function(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})



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

// Avatars
const avatarGeometry = new THREE.BoxGeometry(26,35);
const avatarTexture = new THREE.TextureLoader().load('./IMG/Vishnu-avatar/Matsya-avatar.png');
const avatarMaterial = new THREE.MeshStandardMaterial({map:avatarTexture,transparent:true});
const avatar = new THREE.Mesh(avatarGeometry,avatarMaterial)
avatar.position.set(70,0,0);

const avatar2Geometry = new THREE.BoxGeometry(26,35)
const avatar2Texture = new THREE.TextureLoader().load('./IMG/Vishnu-avatar/Kurma-avatar.png');
const avatar2Material = new THREE.MeshStandardMaterial({map:avatar2Texture,transparent:true});
const avatar2 = new THREE.Mesh(avatar2Geometry,avatar2Material)
avatar2.position.set(45,0,-45);


const avatar3Geometry = new THREE.BoxGeometry(26,35)
const avatar3Texture = new THREE.TextureLoader().load('./IMG/Vishnu-avatar/Varaha-avatar.png');
const avatar3Material = new THREE.MeshStandardMaterial({map:avatar3Texture,transparent:true });
const avatar3 = new THREE.Mesh(avatar3Geometry,avatar3Material)
avatar3.position.set(-45,0,45)

const avatar4Geometry = new THREE.BoxGeometry(26,35)
const avatar4Texture = new THREE.TextureLoader().load('./IMG/Vishnu-avatar/Narasimha-avatar.png');
const avatar4Material = new THREE.MeshStandardMaterial({map:avatar4Texture,transparent:true});
const avatar4 = new THREE.Mesh(avatar4Geometry,avatar4Material)
avatar4.position.set(45,0,45)

const avatar5Geometry = new THREE.BoxGeometry(26,35)
const avatar5Texture = new THREE.TextureLoader().load('./IMG/Vishnu-avatar/Vamana-avatar.png');
const avatar5Material = new THREE.MeshStandardMaterial({map:avatar5Texture,transparent:true});
const avatar5 = new THREE.Mesh(avatar5Geometry,avatar5Material)
avatar5.position.set(-70,0,0)

const avatar6Geometry = new THREE.BoxGeometry(26,35)
const avatar6Texture = new THREE.TextureLoader().load('./IMG/Vishnu-avatar/Parsuram-avatar.png');
const avatar6Material = new THREE.MeshStandardMaterial({map:avatar6Texture,transparent:true});
const avatar6 = new THREE.Mesh(avatar6Geometry,avatar6Material)
avatar6.position.set(-45,0,-45)

const avatar7Geometry = new THREE.BoxGeometry(26,35)
const avatar7Texture = new THREE.TextureLoader().load('./IMG/Vishnu-avatar/Ram-avatar.png');
const avatar7Material = new THREE.MeshStandardMaterial({map:avatar7Texture,transparent:true});
const avatar7 = new THREE.Mesh(avatar7Geometry,avatar7Material)
avatar7.position.set(0,0,-70)




earth.add(avatar);
earth.add(avatar2);
earth.add(avatar3);
earth.add(avatar4);
earth.add(avatar5);
earth.add(avatar6);
earth.add(avatar7);


// Sphere.rotation.y = 45;
renderer.render(scene, camera);

function animation(time){
    earth.rotation.y = time/3000;
    avatar.rotation.y = time/3000;
    avatar2.rotation.y = time/3000;
    avatar3.rotation.y = time/3000;
    avatar4.rotation.y = time/3000;
    avatar5.rotation.y = time/3000;
    avatar6.rotation.y = time/3000;
    avatar7.rotation.y = time/3000;

    renderer.render(scene, camera);
    orbit.update();
    renderer.setAnimationLoop(animation);
}

animation();