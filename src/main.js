
import './App.css'
import * as THREE from 'three';
//let us move around the scene using our mouse
import { OrbitControls } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();    
//                                        view    aspect ratio                  view to from
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
// to render out actual graphics
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);   //full screen canvas
camera.position.setZ(30);  //camera in middle so move it on z-axis, to give better perspective
renderer.render(scene, camera);
//creating object
//step 1: need a geometry
const geometry = new THREE.TorusGeometry(10,3,16,100);  //big 3d ring
//step 2: need material, to give color or texture, think of it as a wrapper for geometry
// MeshBasicMaterial don't react to light, MeshStandardMaterial does
const material = new THREE.MeshStandardMaterial({color:0xFF6347}) 
//step 3: need mesh, combine above both
const torus = new THREE.Mesh(geometry,material);
//now add to scene
scene.add(torus);
//many lights to choose from
//pointLight emits light in all direction
const pointLight = new THREE.PointLight(0xffffff);  //0x means you are dealing with hexadecimal
//set position of light source
pointLight.position.set(5,5,5);
//scene.add(pointLight);

//ambientLight will light up everything in scene equally
const ambientLight = new THREE.AmbientLight(0xffffff);  //0x means you are dealing with hexadecimal
//set position of light source
scene.add(pointLight,ambientLight);

//shows position of light source
const lightHelper = new THREE.PointLightHelper(pointLight);
//draws 2 dimensional grid along the scene
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper,gridHelper);

//will help listen to dom events on mouse and update the camera
const controls = new OrbitControls(camera, renderer.domElement); 

//populate outer space with randomly placed stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);    //radius is 0.24
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry,material);
  //need to generate a random x,y,z position for each star
  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100)); //numbers between -100 and +100 taken
  star.position.set(x,y,z);
  scene.add(star);

}
// 200 stars
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;
//texture mapping: texture to individual materials; process of mapping 2d pixels to 3d geometry

const mubinTexture = new THREE.TextureLoader().load('mubin.jpg');

const mubin = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshBasicMaterial({map:mubinTexture})
);
scene.add(mubin);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
//check again, normalTexture was supposed to create moon surface rough
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
      map:moonTexture,
      normalMap:normalTexture
  
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);  // same as .x = -10

function moveCamera(){
    //calculate where user is currently scrolled to
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    mubin.rotation.y += 0.01;
    mubin.rotation.z += 0.01;

    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
    camera.position.z = t * -0.01;    
}
// fire this function everytime user scrolls
document.body.onscroll = moveCamera

//to actually see it on screen,  renderer.render(scene, camera)
//can't call it again and again so make recursive function to make infinate loop for renderer method
function animate(){
  requestAnimationFrame(animate);   // tells browser you want to perform animation
  //different properties to play with: rotation, position, scale
  //rotate little on each animation frame
  torus.rotation.x += 0.01;
// torus.rotation.y += 0.01;
//  torus.rotation.z += 0.01;
  controls.update();          // added after instanciating OrbitControls class
  renderer.render(scene, camera);
}
animate();