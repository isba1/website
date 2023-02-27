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
scene.background = new THREE.Color( '#F2EFE9' );

/**
 * Object
 */
const width =  10;  

const height = 0.05;  

const depth = 0.05;  


// const geometry = new THREE.IcosahedronGeometry( 4, 15 );
// const material = new THREE.MeshNormalMaterial({ wireframe: true })
const material2 = new THREE.MeshBasicMaterial( { color: '#4BB2F2', wireframe: false } );
const material3 = new THREE.MeshBasicMaterial( { color: '#84AEBF', wireframe: false } );
const material4 = new THREE.MeshBasicMaterial( { color: '#6DDAF2', wireframe: false } );
const spacing = 0.1;
var rods = new THREE.Group();

// linearly maps value from the range (a..b) to (c..d)
function mapRange (value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
}

for (let z = -15; z < 15; z+=(spacing+depth)) {
    let geometry = new THREE.BoxGeometry( width*mapRange(Math.random(), 0, 1, 0.8, 1.1), height, depth );
    let c = new THREE.Color(mapRange(z, -15, 15, 1, 0), mapRange(z, -15, 15, 0, 1), mapRange(Math.random(), 0, 1, 0.7, 0.95))
    const material = new THREE.MeshBasicMaterial( { color: c, wireframe: false } );
    let rod = new THREE.Mesh(geometry, material);
    rod.position.z = z;
    rod.position.x = 1;
    rod.rotation.z = (z / 2.1) *(Math.PI / 2);
    rods.add(rod);
}

//material.side = THREE.DoubleSide
//const mesh = new THREE.Mesh(geometry, material)
// const mesh2 = new THREE.Mesh(geometry, material)
// mesh2.rotation.x += Math.PI / 2
scene.add(rods)
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
camera.position.x = 5
camera.position.y = 5
camera.position.z = 5
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // mesh.rotation.x=elapsedTime*0.1     //consistent spinning across devices
    // mesh.rotation.y = elapsedTime * 0.1
    //rods.rotation.z=elapsedTime*.9
    rods.traverse((e)=>{
        let speed = mapRange(e.position.z, -15, 15, 0.1, 0.5)
        e.rotation.z = (e.position.z / 10) *(Math.PI / 2) + elapsedTime*speed;


    })
    // mesh2.rotation.y = elapsedTime * -0.1


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()