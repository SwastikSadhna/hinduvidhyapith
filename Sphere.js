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
camera.position.set(0,120,180);
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.add(orbit);

// Axes Helper
const axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

// Sphere Geometry

const earthGeometry = new THREE.SphereGeometry(24);
const earthTexture = new THREE.TextureLoader().load('./earth.jpg');
const earthMaterial = new THREE.MeshBasicMaterial( {map:earthTexture});
const earth = new THREE.Mesh(earthGeometry,earthMaterial);
earth.position.set(0,0,0)
scene.add(earth);


// Avatars
const avatarGeometry = new THREE.BoxGeometry(24,24);
const avatarTexture = new THREE.TextureLoader().load('shiva.jpg');
const avatarMaterial = new THREE.MeshBasicMaterial({map:avatarTexture});
const avatar = new THREE.Mesh(avatarGeometry,avatarMaterial)
avatar.position.set(70,0,0)

const avatar2Geometry = new THREE.BoxGeometry(24,24)
const avatar2Texture = new THREE.TextureLoader().load('shiva.jpg');
const avatar2Material = new THREE.MeshBasicMaterial({map:avatar2Texture});
const avatar2 = new THREE.Mesh(avatar2Geometry,avatar2Material)
avatar2.position.set(45,0,-45);

const avatar3Geometry = new THREE.BoxGeometry(24,24)
const avatar3Texture = new THREE.TextureLoader().load('shiva.jpg');
const avatar3Material = new THREE.MeshBasicMaterial({map:avatar3Texture});
const avatar3 = new THREE.Mesh(avatar3Geometry,avatar3Material)
avatar3.position.set(-45,0,45)

const avatar4Geometry = new THREE.BoxGeometry(24,24)
const avatar4Texture = new THREE.TextureLoader().load('shiva.jpg');
const avatar4Material = new THREE.MeshBasicMaterial({map:avatar4Texture});
const avatar4 = new THREE.Mesh(avatar4Geometry,avatar4Material)
avatar4.position.set(45,0,45)

const avatar5Geometry = new THREE.BoxGeometry(24,24)
const avatar5Texture = new THREE.TextureLoader().load('shiva.jpg');
const avatar5Material = new THREE.MeshBasicMaterial({map:avatar5Texture});
const avatar5 = new THREE.Mesh(avatar5Geometry,avatar5Material)
avatar5.position.set(-70,0,0)

const avatar6Geometry = new THREE.BoxGeometry(24,24)
const avatar6Texture = new THREE.TextureLoader().load('shiva.jpg');
const avatar6Material = new THREE.MeshBasicMaterial({map:avatar6Texture});
const avatar6 = new THREE.Mesh(avatar6Geometry,avatar6Material)
avatar6.position.set(-45,0,-45)

const avatar7Geometry = new THREE.BoxGeometry(24,24)
const avatar7Texture = new THREE.TextureLoader().load('shiva.jpg');
const avatar7Material = new THREE.MeshBasicMaterial({map:avatar7Texture});
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

    renderer.render(scene, camera);
    orbit.update();
    renderer.setAnimationLoop(animation);
}

animation();