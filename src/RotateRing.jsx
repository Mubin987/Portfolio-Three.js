// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import * as THREE from 'three';

function RotateRing() {
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
  const material = new THREE.MeshBasicMaterial({color:0xFF6347,wireframe:true})  //wireframe true to get better look, this material not need light source
  //step 3: need mesh, combine above both
  const torus = new THREE.Mesh(geometry,material);
  //now add to scene
  scene.add(torus);
  //to actually see it on screen,  renderer.render(scene, camera)
  //can't call it again and again so make recursive function to make infinate loop for renderer method
  function animate(){
    requestAnimationFrame(animate);   // tells browser you want to perform animation
    //different properties to play with: rotation, position, scale
    //rotate little on each animation frame along each axis
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    renderer.render(scene, camera);
  }
  animate();
  
}

export default RotateRing
