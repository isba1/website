import * as THREE from 'three'
import { BooleanKeyframeTrack, Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( '#000000' );

/**
 * Object
 */
const width =  1;  

const height = 0.05;  

const depth = 0.05;  


// const geometry = new THREE.IcosahedronGeometry( 4, 15 );
// const material = new THREE.MeshNormalMaterial({ wireframe: true })
const material2 = new THREE.MeshBasicMaterial( { color: '#4BB2F2', wireframe: false } );
const material3 = new THREE.MeshBasicMaterial( { color: '#84AEBF', wireframe: false } );
const material4 = new THREE.MeshBasicMaterial( { color: '#6DDAF2', wireframe: false } );
const spacing = 0.1;
//var rods = new THREE.Group();
// var rods1 = new THREE.Group();

// linearly maps value from the range (a..b) to (c..d)
function mapRange (value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
}

function createStrand (startZ, endZ, xPos) {
    const rods = []
    for (let z = startZ; z < endZ; z+=(spacing+depth)) {
        let geometry = new THREE.BoxGeometry( width /**mapRange(Math.random(), 0, 1, 0.8, 1.1)*/, height, depth );
        let c = new THREE.Color(mapRange(z, -10, 10, 1, 0), mapRange(z, -10, 10, 0, 1), mapRange(Math.random(), 0, 1, 0.7, 0.95))
        const material = new THREE.MeshBasicMaterial( { color: c, wireframe: false } );
        let rod = new THREE.Mesh(geometry, material);
        rod.position.z = z;
        rod.position.x = xPos;
        rod.rotation.z = (z / 2.1) *(Math.PI / 2); 
        rods.push(rod);
        scene.add(rod);
    }
    return rods;
}

const rods1 = createStrand(-50, 50, -10);
const rods2 = createStrand(-50, 50, -8);
const rods3 = createStrand(-50, 50, -6);
const rods4 = createStrand(-50, 50, -4);
const rods5 = createStrand(-50, 50, -2);
const rods6 = createStrand(-50, 50, 0);
const rods7 = createStrand(-50, 50, 2);
const rods8 = createStrand(-50, 50, 4);
const rods9 = createStrand(-50, 50, 6);
const rods10 = createStrand(-50, 50, 8);
const rods11 = createStrand(-50, 50, 10);


// const rods = [];
// for (let z = -15; z < 50; z+=(spacing+depth)) {
//     let geometry = new THREE.BoxGeometry( width /**mapRange(Math.random(), 0, 1, 0.8, 1.1)*/, height, depth );
//     let c = new THREE.Color(mapRange(z, -10, 10, 1, 0), mapRange(z, -10, 10, 0, 1), mapRange(Math.random(), 0, 1, 0.7, 0.95))
//     const material = new THREE.MeshBasicMaterial( { color: c, wireframe: false } );
//     let rod = new THREE.Mesh(geometry, material);
//     rod.position.z = z;
//     rod.position.x = 0;
//     rod.rotation.z = (z / 2.1) *(Math.PI / 2); 
//     rods.push(rod);
//     scene.add(rod);
// }

// const rods1 = [];
// for (let z = -20; z < 45; z+=(spacing+depth)) {
//     let geometry = new THREE.BoxGeometry( width /**mapRange(Math.random(), 0, 1, 0.8, 1.1)*/, height, depth );
//     let c = new THREE.Color(mapRange(z, -15, 15, 1, 0), mapRange(z, -15, 5, 0, 1), mapRange(Math.random(), 0, 1, 0.7, 0.95))
//     const material = new THREE.MeshBasicMaterial( { color: c, wireframe: false } );
//     let rod = new THREE.Mesh(geometry, material);
//     rod.position.z = z;
//     rod.position.x = -4;
//     rod.rotation.z = (z / 2.1) *(Math.PI / 2);
//     rods1.push(rod);
//     scene.add(rod);
// }

// const rods2 = [];
// for (let z = -10; z < 55; z+=(spacing+depth)) {
//     let geometry = new THREE.BoxGeometry( width /**mapRange(Math.random(), 0, 1, 0.8, 1.1)*/, height, depth );
//     let c = new THREE.Color(mapRange(z, -15, 15, 1, 0), mapRange(z, -15, 5, 0, 1), mapRange(Math.random(), 0, 1, 0.7, 0.95))
//     const material = new THREE.MeshBasicMaterial( { color: c, wireframe: false } );
//     let rod = new THREE.Mesh(geometry, material);
//     rod.position.z = z;
//     rod.position.x = 1.5;
//     rod.rotation.z = (z / 2.1) *(Math.PI / 2);
//     rods2.push(rod);
//     scene.add(rod);
// }

//material.side = THREE.DoubleSide
//const mesh = new THREE.Mesh(geometry, material)
// const mesh2 = new THREE.Mesh(geometry, material)
// mesh2.rotation.x += Math.PI / 2
//scene.add(rods)
//scene.add(rods1)
// scene.add(mesh2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 10
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
//let angle = 0;


function rotateStrand(rodArray, factor) {
    rodArray.forEach((e) => {
        e.rotation.z += factor;
    })
}

const tick = () =>
{
    
    //angle += 1
    const elapsedTime = clock.getElapsedTime()

    rotateStrand(rods1, 0.01);
    rotateStrand(rods2, 0.02);
    rotateStrand(rods3, 0.03);
    rotateStrand(rods4, 0.04);
    rotateStrand(rods5, 0.05);
    rotateStrand(rods6, 0.06);
    rotateStrand(rods7, 0.07);
    rotateStrand(rods8, 0.08);
    rotateStrand(rods9, 0.09);
    rotateStrand(rods10, 0.10);
    rotateStrand(rods11, 0.11);


    // mesh.rotation.x=elapsedTime*0.1     //consistent spinning across devices
    // mesh.rotation.y = elapsedTime * 0.1
    // rods.rotation.z = elapsedTime * .8
    //rods1.rotation.z = elapsedTime * .8
    // rods1.rotation.axis1  = elapsedTime * 0.8
    //rods1.rotateOnAxis(axis1, angle)
    // angle = elapsedTime * 0.5;
    // rods.rotation.z = angle;
    // rods1.traverse((e)=>{
    //     //let speed = mapRange(e.position.z, -15, 15, 0.1, 0.5)
    //     e.rotation.z = elapsedTime * .8


    // })
    // mesh2.rotation.y = elapsedTime * -0.1


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()